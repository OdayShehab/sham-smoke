import React from 'react';
import { Flame, ShieldCheck, Award } from 'lucide-react';

export const BrandStory: React.FC = () => {
  return (
    <section id="brand-story" className="relative py-28 bg-[#0B0B0C] border-t border-zinc-900 overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-[#9B2226]/10 blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Side: Editorial Story Column */}
        <div className="lg:col-span-6 text-left space-y-8">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
            <Flame className="w-3.5 h-3.5 text-[#9B2226]" />
            HERITAGE REINVENTED
          </div>

          <h2 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tighter text-white leading-tight">
            THE ANCIENT SPICE HEARTH <br />
            <span className="text-gradient-ember">RECONCEPTUALIZED</span>
          </h2>

          <p className="text-base text-zinc-300 font-light leading-relaxed">
            Syrian culinary tradition is built on centuries of patience: 72-hour garlic toum steeps, 
            hand-crushed Aleppo silk peppers, and hardwood charcoal searing. 
            At <strong className="text-white">SHAM & SMOKE</strong>, we strip away clichés to spotlight pure product excellence.
          </p>

          <p className="text-sm text-zinc-400 font-light leading-relaxed">
            We don’t compromise. Our sujuk beef smash patties are hand-blended with roasted coriander seed and 
            smoked over white-hot oak. Our chicken shawarma is carved paper-thin from vertical coals and pressed 
            between iron griddles in fresh Saj bread.
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-zinc-800">
            <div>
              <span className="font-display font-black text-3xl sm:text-4xl text-[#D4AF37] block">72 HRS</span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">Garlic Toum Steep</span>
            </div>
            <div>
              <span className="font-display font-black text-3xl sm:text-4xl text-[#E63946] block">850°F</span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">Oak Charcoal Sear</span>
            </div>
            <div>
              <span className="font-display font-black text-3xl sm:text-4xl text-white block">100%</span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">Zabiha Halal Certified</span>
            </div>
          </div>
        </div>

        {/* Right Side: Editorial Grid Collage */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-4 relative">
          
          <div className="space-y-4">
            <div className="h-64 rounded-xl overflow-hidden border border-zinc-800 bg-black shadow-2xl">
              <img
                src="/assets/images/shawarma.png"
                alt="Syrian Shawarma Craft"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-6 bg-[#141418] border border-zinc-800 rounded-xl text-left space-y-2">
              <ShieldCheck className="w-6 h-6 text-[#9B2226]" />
              <h4 className="font-display font-bold text-sm text-white uppercase">Pure Ingredients</h4>
              <p className="text-xs text-zinc-400 font-light">Zero artificial preservatives, pure cold-pressed extra virgin olive oil and stone-ground sesame.</p>
            </div>
          </div>

          <div className="space-y-4 pt-8">
            <div className="p-6 bg-[#141418] border border-zinc-800 rounded-xl text-left space-y-2">
              <Award className="w-6 h-6 text-[#D4AF37]" />
              <h4 className="font-display font-bold text-sm text-white uppercase">Wood Fire Charcoal</h4>
              <p className="text-xs text-zinc-400 font-light">Natural Syrian oak hardwood delivers intense smoky crust without overpowering delicate spice notes.</p>
            </div>
            <div className="h-64 rounded-xl overflow-hidden border border-zinc-800 bg-black shadow-2xl">
              <img
                src="/assets/images/burger.png"
                alt="Flame Sujuk Burger"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
