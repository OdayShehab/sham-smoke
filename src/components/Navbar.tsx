import React, { useState, useEffect } from 'react';
import { Flame, Menu, X, ShoppingBag } from 'lucide-react';

interface NavbarProps {
  onOpenOrderModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenOrderModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B0B0C]/90 backdrop-blur-md border-b border-zinc-800/80 py-3 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Brand Logo & Tagline */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-[#9B2226] flex items-center justify-center text-white shadow-[0_0_15px_rgba(155,34,38,0.5)] transition-transform group-hover:scale-105">
            <Flame className="w-5 h-5 fill-current" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-display font-black text-xl tracking-tighter uppercase text-white group-hover:text-[#E63946] transition-colors">
              SHAM & SMOKE
            </span>
            <span className="text-[10px] tracking-widest uppercase text-zinc-400 font-mono">
              Syrian Kitchen & Flame
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-widest text-zinc-300">
          <a href="#menu" className="hover:text-[#E63946] transition-colors py-1">
            MENU
          </a>
          <a href="#signature" className="hover:text-[#E63946] transition-colors py-1">
            SIGNATURE DISHES
          </a>
          <a href="#brand-story" className="hover:text-[#E63946] transition-colors py-1">
            ABOUT STORY
          </a>
          <a href="#locations" className="hover:text-[#E63946] transition-colors py-1">
            LOCATIONS
          </a>
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={onOpenOrderModal}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#9B2226] hover:bg-[#B71C1C] text-white text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_15px_rgba(155,34,38,0.4)] cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>ORDER ONLINE</span>
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-zinc-300 hover:text-white"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[60px] bg-[#0E0E11]/95 backdrop-blur-xl border-b border-zinc-800 p-6 flex flex-col gap-5 text-left animate-in slide-in-from-top-2">
          <a
            href="#menu"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-semibold tracking-widest uppercase text-zinc-200 hover:text-[#E63946]"
          >
            MENU
          </a>
          <a
            href="#signature"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-semibold tracking-widest uppercase text-zinc-200 hover:text-[#E63946]"
          >
            SIGNATURE DISHES
          </a>
          <a
            href="#brand-story"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-semibold tracking-widest uppercase text-zinc-200 hover:text-[#E63946]"
          >
            OUR STORY
          </a>
          <a
            href="#locations"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-semibold tracking-widest uppercase text-zinc-200 hover:text-[#E63946]"
          >
            LOCATIONS
          </a>

          <div className="pt-4 border-t border-zinc-800 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrderModal();
              }}
              className="w-full py-3 bg-[#9B2226] text-white font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              ORDER ONLINE
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
