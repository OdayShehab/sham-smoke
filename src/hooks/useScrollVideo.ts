import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 90; // 90 high-res frames cached in GPU memory

interface UseScrollVideoProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  canvasRef?: React.RefObject<HTMLCanvasElement | null>;
  videoDuration?: number;
}

export function useScrollVideo({ containerRef, videoRef, canvasRef, videoDuration = 6 }: UseScrollVideoProps) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);

  const targetTimeRef = useRef(0);
  const progressRef = useRef(0);
  const animFrameIdRef = useRef<number | null>(null);

  // Cached GPU ImageBitmap frames array
  const framesRef = useRef<(ImageBitmap | null)[]>(new Array(TOTAL_FRAMES).fill(null));

  // Initialize video state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';

    const handleReady = () => {
      setIsLoaded(true);
      setHasVideoError(false);
      video.pause();
      ScrollTrigger.refresh();
    };

    const handleError = () => {
      setHasVideoError(true);
    };

    if (video.readyState >= 1) {
      handleReady();
    } else {
      video.addEventListener('loadedmetadata', handleReady);
      video.addEventListener('loadeddata', handleReady);
      video.addEventListener('canplay', handleReady);
      video.addEventListener('error', handleError);
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleReady);
      video.removeEventListener('loadeddata', handleReady);
      video.removeEventListener('canplay', handleReady);
      video.removeEventListener('error', handleError);
    };
  }, [videoRef]);

  // Background frame pre-loader (extracts 90 frames into ImageBitmap for 60/120fps smooth scrubbing)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isCancelled = false;

    const preloadFrames = async () => {
      if (!video || video.readyState < 1) return;
      const dur = video.duration && !isNaN(video.duration) && isFinite(video.duration) && video.duration > 0
        ? video.duration
        : videoDuration;

      const step = dur / TOTAL_FRAMES;

      const offscreenCanvas = document.createElement('canvas');
      offscreenCanvas.width = video.videoWidth || 1280;
      offscreenCanvas.height = video.videoHeight || 720;
      const offCtx = offscreenCanvas.getContext('2d');
      if (!offCtx) return;

      const bgVideo = document.createElement('video');
      bgVideo.src = video.src;
      bgVideo.muted = true;
      bgVideo.playsInline = true;
      bgVideo.preload = 'auto';

      await new Promise((res) => {
        bgVideo.onloadeddata = res;
        bgVideo.load();
      });

      for (let i = 0; i < TOTAL_FRAMES && !isCancelled; i++) {
        bgVideo.currentTime = i * step;
        await new Promise((res) => {
          const onSeek = () => {
            bgVideo.removeEventListener('seeked', onSeek);
            res(null);
          };
          bgVideo.addEventListener('seeked', onSeek);
        });

        if (isCancelled) break;
        offCtx.drawImage(bgVideo, 0, 0, offscreenCanvas.width, offscreenCanvas.height);
        try {
          const bmp = await createImageBitmap(offscreenCanvas);
          framesRef.current[i] = bmp;
        } catch (e) {
          // Fallback if createImageBitmap is unsupported
        }
      }
    };

    if (video.readyState >= 2) {
      preloadFrames();
    } else {
      video.addEventListener('canplay', preloadFrames, { once: true });
    }

    return () => {
      isCancelled = true;
    };
  }, [videoRef, videoDuration]);

  // GSAP ScrollTrigger Scroll-Driven Video Scrubber
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    const canvas = canvasRef?.current;
    const ctx = canvas?.getContext('2d');

    const drawCurrentFrame = () => {
      if (!ctx || !canvas) return;

      const currentProgress = progressRef.current;
      const frameIdx = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.floor(currentProgress * TOTAL_FRAMES))
      );

      const cachedBmp = framesRef.current[frameIdx];

      // Instant 0ms GPU paint if frame is cached
      if (cachedBmp) {
        if (canvas.width !== cachedBmp.width || canvas.height !== cachedBmp.height) {
          canvas.width = cachedBmp.width;
          canvas.height = cachedBmp.height;
        }
        ctx.drawImage(cachedBmp, 0, 0, canvas.width, canvas.height);
        return;
      }

      // Fallback while preloader completes
      if (video && video.readyState >= 1) {
        if (video.videoWidth > 0 && video.videoHeight > 0) {
          if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
          }
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        }
      }
    };

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: () => '+=' + (window.innerHeight * 2.5),
      pin: true,
      pinSpacing: true,
      scrub: 0.1, // Ultra responsive scrubbing
      anticipatePin: 1,
      onUpdate: (self) => {
        const currentProgress = self.progress;
        progressRef.current = currentProgress;
        setProgress(currentProgress);

        const dur = video.duration && !isNaN(video.duration) && isFinite(video.duration) && video.duration > 0
          ? video.duration
          : videoDuration;

        targetTimeRef.current = Math.max(0, Math.min(dur - 0.05, currentProgress * dur));
      },
    });

    // Render loop: 60/120fps continuous paint
    const renderLoop = () => {
      const currentProgress = progressRef.current;
      const frameIdx = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.floor(currentProgress * TOTAL_FRAMES))
      );

      // If frame is NOT cached yet, seek video as fallback
      if (!framesRef.current[frameIdx] && video && video.readyState >= 1) {
        const target = targetTimeRef.current;
        const current = video.currentTime;
        const diff = target - current;

        if (!video.seeking && Math.abs(diff) > 0.01) {
          try {
            video.currentTime = target;
          } catch (e) {
            // Ignore
          }
        }
      }

      drawCurrentFrame();
      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(renderLoop);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      drawCurrentFrame();
    }, 300);

    return () => {
      clearTimeout(timer);
      trigger.kill();
      if (animFrameIdRef.current !== null) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [containerRef, videoRef, canvasRef, videoDuration]);

  return { progress, isLoaded, hasVideoError };
}




