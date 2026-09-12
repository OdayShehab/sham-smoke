# دليل حلول وتقنيات تحريك الفيديو مع التمرير (Scroll-Driven Video Scrubbing Guide)

تم إعداد هذا المستند ليكون مرجعاً تقنياً شاملاً للتطبيقات المستقبلية التي تتطلب ربط عرض الفيديو بحركة التمرير (Scroll-Driven Canvas & Video Scrubbing) مع دعم التمرير السلس (Smooth Scroll) وأداء عالي السرعة (60-120 FPS).

---

## 1. المشاكل الشائعة والحلول الهندسية (Common Issues & Technical Solutions)

### المشكلة الأولى: بطء وتقطع الـ Seeking في الفيديو (`video.currentTime` Lag & Stutter)
* **المشكلة**: عند الاستجابة لحدث التمرير بـ `video.currentTime = targetTime` بشكل مباشر، يقوم المتصفح بإلغاء وإعادة عملية الـ Seeking، لأن مفاتيح الإطارات (Keyframes/iFrames) في ملفات MP4 تحتاج من 50ms إلى 200ms للفك (Decoding). يؤدي ذلك إلى تقطع حركة الفيديو، أو تجمده عند إطار معين.
* **الحل**:
  1. التحول من العرض المباشر لعنصر `<video>` إلى العرض عبر **عنصر الـ Canvas (`<canvas>`)**.
  2. استخدام تقنية **تخزين الإطارات مؤقتاً في ذاكرة كرت الشاشة (GPU ImageBitmap Pre-caching)**:
     - عند تحميل الصفحة، يتم تشغيل برنامج خلفي يمر على إطارات الفيديو (مثلاً 90-120 إطار) ويقوم برسمها وتحويلها إلى `ImageBitmap` وتخزينها في المصفوفة (`framesRef`).
     - أثناء التمرير، يستبدل محرك الرندر عمليات الـ Seek المعقدة بقراءة فورية للإطار المُخزّن رسمه فورياً بـ `ctx.drawImage(cachedBitmap, 0, 0)`.
     - سرعة الرسم أصبحت **أقل من 0.1ms** مما يعطي حركة سلسة بنسبة 100% وبدون أي بطء.

---

### المشكلة الثانية: تعارض مكتبة التمرير السلس `Lenis` مع `GSAP ScrollTrigger`
* **المشكلة**: تقوم مكتبة `Lenis` باعتراض أحداث عجلة الماوس واللمس لتحويلها إلى تمرير ذو عزم سلس (Momentum Scroll). بناءً عليه، لا يستقبل `GSAP ScrollTrigger` أحداث التمرير الافتراضية، فتتوقف حركات الـ Scroll Scrub أو تثبيت العناصر (Pinning).
* **الحل**:
  إنشاء جسر ربط ثنائي الاتجاه (Two-Way Bridge) بين `Lenis` و `GSAP` في المكون الرئيسي (`App.tsx`):
  ```typescript
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // 1. تحديث GSAP ScrollTrigger مع كل حركة تمرير من Lenis
    lenis.on('scroll', ScrollTrigger.update);

    // 2. دمج Lenis داخل الـ Ticker الخاص بـ GSAP لتوحيد رندر الإطارات (rAF)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf as any);
    };
  }, []);
  ```

---

### المشكلة الثالثة: حالة التجمد والطلب المتكرر (`seeking: true` & `readyState`)
* **المشكلة**: محاولة إسناد قيمة لـ `video.currentTime` قبل اكتمال تحميل بيانات الفيديو (`readyState < 1`) أو أثناء وجود عملية بحث نشطة (`video.seeking === true`) تؤدي لحبس الفيديو في طابور انتظار دائم وتجمده.
* **الحل**:
  1. التحقق من جاهزية الفيديو عبر `video.readyState >= 1`.
  2. إضافة شرط الحماية قبل أي طلب Seek جديد:
     ```typescript
     if (!video.seeking && Math.abs(target - current) > 0.01) {
       video.currentTime = target;
     }
     ```

---

### المشكلة الرابعة: التشويش البصري وضياع تركيز التصميم (UI/UX Visual Clutter)
* **المشكلة**: وضع عناصر نصية وشارات كنس نسبة مئوية تفاعلية فوق الفيديو بشكل مكثف يتسبب في تشتيت انتباه المستخدم وتغطية تفاصيل الحركة.
* **الحل**:
  - إزالة العناوين والشارات العائمة الفوقية عن الفيديو ليبقى الفيديو نظيفاً وسينمائياً بالكامل.
  - جعل الفيديو خلفية شاملة للشاشة (`Full-Screen Background Canvas`) مع إضافة تدرج ظلي متدرج (`Dark Gradient Overlay & Vignette`) لضمان وضوح وقراءة النصوص والأزرار الموجودة فوقه بتباين ممتاز.

---

## 2. الهيكلية الكودية الجاهزة لإعادة الاستخدام (Reusable Code Snippets)

### أ) الهوك المخصص للربط والرندر (`useScrollVideo.ts`)

```typescript
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 90; // عدد الإطارات المستهدفة للتخزين المؤقت

interface UseScrollVideoProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  canvasRef?: React.RefObject<HTMLCanvasElement | null>;
  videoDuration?: number;
}

export function useScrollVideo({ containerRef, videoRef, canvasRef, videoDuration = 6 }: UseScrollVideoProps) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const targetTimeRef = useRef(0);
  const progressRef = useRef(0);
  const animFrameIdRef = useRef<number | null>(null);
  const framesRef = useRef<(ImageBitmap | null)[]>(new Array(TOTAL_FRAMES).fill(null));

  // 1. تهيئة حالة الفيديو
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';

    const handleReady = () => {
      setIsLoaded(true);
      video.pause();
      ScrollTrigger.refresh();
    };

    if (video.readyState >= 1) {
      handleReady();
    } else {
      video.addEventListener('loadedmetadata', handleReady);
      video.addEventListener('loadeddata', handleReady);
      video.addEventListener('canplay', handleReady);
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleReady);
      video.removeEventListener('loadeddata', handleReady);
      video.removeEventListener('canplay', handleReady);
    };
  }, [videoRef]);

  // 2. استخراج الإطارات في الخلفية وتخزينها بالـ GPU (ImageBitmap Pre-caching)
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
          // Fallback
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

  // 3. ربط التمرير بـ GSAP ScrollTrigger ورسم الإطار الحالي بـ 60/120fps
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

      // رسم الإطار المخزن في الـ GPU فوراً (0ms latency)
      if (cachedBmp) {
        if (canvas.width !== cachedBmp.width || canvas.height !== cachedBmp.height) {
          canvas.width = cachedBmp.width;
          canvas.height = cachedBmp.height;
        }
        ctx.drawImage(cachedBmp, 0, 0, canvas.width, canvas.height);
        return;
      }

      // رسم الاحتياطي من عنصر الفيديو مباشرة في حال عدم اكتمال التحميل المسبق
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
      scrub: 0.1,
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

    const renderLoop = () => {
      const currentProgress = progressRef.current;
      const frameIdx = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.floor(currentProgress * TOTAL_FRAMES))
      );

      if (!framesRef.current[frameIdx] && video && video.readyState >= 1) {
        const target = targetTimeRef.current;
        const current = video.currentTime;
        const diff = target - current;

        if (!video.seeking && Math.abs(diff) > 0.01) {
          try {
            video.currentTime = target;
          } catch (e) {}
        }
      }

      drawCurrentFrame();
      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      trigger.kill();
      if (animFrameIdRef.current !== null) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [containerRef, videoRef, canvasRef, videoDuration]);

  return { progress, isLoaded };
}
```

---

### ب) مكون الهيرو خلفية الفيديو الكاملة (`BurgerHero.tsx`)

```tsx
import React, { useRef, useEffect } from 'react';
import { useScrollVideo } from '../hooks/useScrollVideo';
import burgerVideoUrl from '../assets/burger_deconstruction.mp4';

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useScrollVideo({
    containerRef,
    videoRef,
    canvasRef,
  });

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.playsInline = true;
      videoRef.current.load();
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[720px] bg-[#0B0B0C] text-[#F7F4EF] flex flex-col justify-between items-center overflow-hidden"
    >
      {/* 1. خلفية الفيديو بالـ Canvas مع تدرج التظليل */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover opacity-75 scale-[1.02] filter contrast-[1.05]"
        />
        <video
          ref={videoRef}
          src={burgerVideoUrl}
          playsInline
          muted
          preload="auto"
          className="hidden"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/40 to-[#0B0B0C]/75" />
      </div>

      {/* 2. المحتوى التحريري والنصوص والأزرار التفاعلية فوق الفيديو */}
      <div className="relative z-10 max-w-5xl mx-auto w-full px-6 pt-32 pb-12 flex flex-col items-center justify-center text-center space-y-6 flex-grow">
        <h1 className="font-display font-extrabold text-4xl sm:text-7xl uppercase text-[#F7F4EF]">
          YOUR TITLE HERE
        </h1>
        <p className="text-base sm:text-xl text-zinc-300 max-w-2xl">
          Your subtitle and brand description here.
        </p>
      </div>
    </section>
  );
};
```

---

## 3. ملخص أفضل الممارسات للمشاريع القادمة (Best Practices Summary)

1. **استخدام Canvas مع ImageBitmap دائماً**: لا تعتمد على السيك المباشر لعنصر `<video>` مطلقاً في التمرير السريع.
2. **توحيد الـ Frame Loop**: تأكد من دمج `Lenis.raf` مع `gsap.ticker` لضمان عدم وجود تفاوت في الفريمات بين التمرير والأنيميشن.
3. **التظليل الظلي التكيّفي (Adaptive Vignette)**: استخدم تدرجات الـ CSS Gradient (`from-black via-black/40 to-black/80`) فوق الفيديو لضمان التباين العالي (High Contrast Ratio) للنصوص المطبوعة.
