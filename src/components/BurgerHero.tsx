import React, { useRef, useEffect } from 'react';
import { useScrollVideo } from '../hooks/useScrollVideo';
import { ArrowDown, Flame, ChevronDown } from 'lucide-react';
import burgerVideoUrl from '../assets/burger_compressed.mp4';

interface BurgerHeroProps {
  onExploreMenu: () => void;
}

export const BurgerHero: React.FC<BurgerHeroProps> = ({ onExploreMenu }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { progress } = useScrollVideo({
    containerRef,
    videoRef,
    canvasRef,
  });

  // Force video initialization on mount
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
      id="hero"
      className="relative w-full h-screen min-h-[720px] bg-[#0B0B0C] text-[#F7F4EF] flex flex-col justify-between items-center overflow-hidden selection:bg-[#9B2226]"
    >
      {/* Full-Screen Scroll Video Canvas Background */}
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

        {/* Ambient Dark Gradient & Vignette Overlay for Crisp Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/40 to-[#0B0B0C]/75" />
        <div className="absolute inset-0 bg-radial-vignette opacity-60" />
      </div>

      {/* Background Lighting & Radial Ember Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[#9B2226]/20 rounded-full blur-[180px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none z-0" />

      {/* Hero Foreground Content: Centered Text & CTAs */}
      <div className="relative z-10 max-w-5xl mx-auto w-full px-6 pt-32 pb-12 flex flex-col items-center justify-center text-center space-y-6 flex-grow">
        
        {/* Brand Tag Badge */}
        <div
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#18181B]/80 border border-[#9B2226]/40 text-xs font-semibold uppercase tracking-widest text-[#E63946] shadow-xl backdrop-blur-md"
          style={{
            transform: `translateY(${-8 * progress}px)`,
            opacity: 1 - progress * 0.4,
            willChange: 'transform, opacity',
          }}
        >
          <Flame className="w-4 h-4 text-[#E63946] animate-pulse" />
          <span>Modern Syrian Gastronomy</span>
        </div>

        {/* Main Editorial Headline with Kinetic Depth Motion */}
        <h1
          className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-[0.92] text-[#F7F4EF] drop-shadow-2xl"
          style={{
            opacity: 1 - progress * 0.78,
            transform: `scale(${1 - progress * 0.08})`,
            willChange: 'transform, opacity',
          }}
        >
          <span
            className="inline-block"
            style={{
              transform: `translateY(${-20 * progress}px)`,
              willChange: 'transform',
            }}
          >
            SYRIAN
          </span>{' '}
          <span
            className="inline-block text-gradient-ember"
            style={{
              transform: `translateY(${-35 * progress}px)`,
              willChange: 'transform',
            }}
          >
            SHAWARMA
          </span>{' '}
          <br className="hidden sm:inline" />
          <span
            className="inline-block"
            style={{
              transform: `translateY(${-50 * progress}px)`,
              willChange: 'transform',
            }}
          >
            & BURGERS
          </span>
        </h1>

        {/* Editorial Subtitle */}
        <p
          className="text-base sm:text-xl text-zinc-300 font-light max-w-2xl leading-relaxed drop-shadow-md"
          style={{
            transform: `translateY(${-20 * progress}px)`,
            opacity: Math.max(0, 1 - progress * 1.25),
            willChange: 'transform, opacity',
          }}
        >
          Ancient Aleppo spice heritage meets charcoal flame craft. Experience our signature 
          deconstructed sujuk smash burger & 72-hour toum shawarma.
        </p>

        {/* Primary CTA Buttons */}
        <div
          className="pt-4 flex flex-wrap items-center justify-center gap-5"
          style={{
            transform: `translateY(${-15 * progress}px)`,
            opacity: Math.max(0, 1 - progress * 1.25),
            willChange: 'transform, opacity',
          }}
        >
          <button
            onClick={onExploreMenu}
            className="group relative inline-flex items-center justify-center px-9 py-4 bg-[#9B2226] text-white font-medium text-sm tracking-widest uppercase rounded-none overflow-hidden transition-all duration-300 hover:bg-[#B71C1C] hover:shadow-[0_0_35px_rgba(155,34,38,0.7)] cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-3">
              EXPLORE MENU
              <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
            </span>
          </button>

          <a
            href="#brand-story"
            className="px-8 py-4 border border-zinc-700/80 bg-black/40 backdrop-blur-md text-zinc-200 font-medium text-sm tracking-widest uppercase hover:border-zinc-400 hover:text-white transition-colors duration-300"
          >
            OUR STORY
          </a>
        </div>
      </div>

      {/* Bottom Scroll Prompt Bar */}
      <div className="relative z-10 w-full pb-8 pt-2 flex flex-col items-center justify-center gap-2">
        <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase flex items-center gap-2 drop-shadow-sm">
          SCROLL DOWN TO DECONSTRUCT BURGER
        </span>
        <ChevronDown className="w-5 h-5 text-[#E63946] animate-bounce" />
      </div>
    </section>
  );
};
