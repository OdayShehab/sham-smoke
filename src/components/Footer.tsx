import React from 'react';
import { Flame, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#070708] border-t border-zinc-900 pt-20 pb-12 text-zinc-400 text-left">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-zinc-900">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#9B2226] flex items-center justify-center text-white">
                <Flame className="w-5 h-5 fill-current" />
              </div>
              <span className="font-display font-black text-2xl tracking-tighter uppercase text-white">
                SHAM & SMOKE
              </span>
            </div>
            <p className="text-xs font-light text-zinc-400 max-w-sm leading-relaxed">
              Modern Syrian Shawarma & Flame Burgers. A dark cinematic food experience fusing 
              Aleppo spice heritage with high-temperature oak charcoal technique.
            </p>
            <p className="text-[11px] font-mono text-[#D4AF37]">
              © 2026 SHAM & SMOKE GOURMET GROUP. ALL RIGHTS RESERVED.
            </p>
          </div>

          {/* Nav Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-white block font-bold">NAVIGATION</span>
            <ul className="space-y-2 text-xs font-mono">
              <li><a href="#hero" className="hover:text-[#E63946] transition-colors">01. HERO EXPERIENCE</a></li>
              <li><a href="#menu" className="hover:text-[#E63946] transition-colors">02. EDITORIAL MENU</a></li>
              <li><a href="#signature" className="hover:text-[#E63946] transition-colors">03. SIGNATURE DISHES</a></li>
              <li><a href="#brand-story" className="hover:text-[#E63946] transition-colors">04. OUR HERITAGE</a></li>
              <li><a href="#locations" className="hover:text-[#E63946] transition-colors">05. LOCATIONS & HOURS</a></li>
            </ul>
          </div>

          {/* Socials & Newsletter */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-white block font-bold">STAY CONNECTED</span>
            <p className="text-xs text-zinc-400 font-light">
              Subscribe for private tasting invitations, seasonal menu drops, and secret pop-up locations.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="ENTER YOUR EMAIL..."
                className="bg-[#121215] border border-zinc-800 px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#9B2226] flex-grow font-mono"
              />
              <button className="px-5 py-2.5 bg-[#9B2226] text-white text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#B71C1C] transition-colors cursor-pointer">
                JOIN
              </button>
            </div>
            
            <div className="flex items-center gap-4 pt-2">
              <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-full bg-zinc-900 hover:bg-[#9B2226] text-zinc-300 hover:text-white flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" aria-label="Facebook" className="w-8 h-8 rounded-full bg-zinc-900 hover:bg-[#9B2226] text-zinc-300 hover:text-white flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/></svg>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-zinc-500">
          <span>DESIGNED WITH LUXURY EDITORIAL SPECIFICATION</span>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
