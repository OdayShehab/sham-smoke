import React from 'react';
import { MENU_ITEMS, type MenuItem } from '../data/menuData';
import { Star, ArrowRight } from 'lucide-react';

interface SignatureDishesProps {
  onSelectDish: (dish: MenuItem) => void;
}

export const SignatureDishes: React.FC<SignatureDishesProps> = ({ onSelectDish }) => {
  const signatureItems = MENU_ITEMS.filter((item) => item.dietary?.includes('Chef Signature'));

  return (
    <section id="signature" className="relative py-28 bg-[#0E0E11] border-t border-zinc-900 overflow-hidden">
      
      {/* Background Lighting */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#9B2226]/15 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1A1A1E] border border-[#9B2226]/40 rounded-full text-xs font-mono uppercase tracking-widest text-[#E63946]">
            <Star className="w-3.5 h-3.5 fill-current text-[#D4AF37]" />
            CRAFTED WITHOUT COMPROMISE
          </div>

          <h2 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tighter text-white">
            FLAGSHIP <span className="text-gradient-gold">SIGNATURE</span> DISHES
          </h2>

          <p className="text-sm text-zinc-400 font-light leading-relaxed">
            The culinary pillars of SHAM & SMOKE. Each dish is an uncompromising fusion of ancient Syrian spice ratios and high-temperature flame mastery.
          </p>
        </div>

        {/* Signature Dishes Showcase Grid */}
        <div className="space-y-16">
          {signatureItems.map((dish, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={dish.id}
                onClick={() => onSelectDish(dish)}
                className={`group grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#141418] border border-zinc-800/80 hover:border-[#9B2226]/50 p-6 sm:p-10 transition-all duration-500 hover:shadow-2xl cursor-pointer ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Image Side */}
                <div className={`lg:col-span-7 relative h-[340px] sm:h-[420px] rounded-xl overflow-hidden bg-black ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute top-6 left-6 px-4 py-1.5 bg-[#9B2226] text-white font-mono text-xs font-bold uppercase tracking-widest shadow-lg">
                    CHEF SIGNATURE SELECTION #{index + 1}
                  </div>

                  <div className="absolute bottom-6 right-6 font-mono text-2xl font-black text-[#D4AF37] bg-black/80 backdrop-blur-md px-4 py-2 rounded-md border border-zinc-700">
                    ${dish.price.toFixed(2)}
                  </div>
                </div>

                {/* Content Side */}
                <div className={`lg:col-span-5 flex flex-col justify-center text-left space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div>
                    <span className="font-arabic text-lg text-[#D4AF37] block mb-1">{dish.arabicName}</span>
                    <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white group-hover:text-[#E63946] transition-colors leading-tight">
                      {dish.name}
                    </h3>
                  </div>

                  <p className="text-sm text-zinc-300 font-light leading-relaxed">
                    {dish.longDescription}
                  </p>

                  {/* Ingredients Breakdown */}
                  <div className="space-y-2 pt-2 border-t border-zinc-800">
                    <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block">KEY INGREDIENT COMPOSITION</span>
                    <div className="flex flex-wrap gap-2">
                      {dish.ingredients.map((ing) => (
                        <span key={ing} className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-xs font-sans text-zinc-300">
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <button className="inline-flex items-center gap-3 text-xs font-mono font-bold tracking-widest text-[#D4AF37] group-hover:text-white uppercase">
                      <span>EXPLORE INGREDIENTS & PAIRINGS</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
