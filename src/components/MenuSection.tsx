import React, { useState } from 'react';
import { MENU_ITEMS, type MenuItem } from '../data/menuData';
import { Sparkles, Info, ChevronRight } from 'lucide-react';

interface MenuSectionProps {
  onSelectDish: (dish: MenuItem) => void;
}

type CategoryType = 'all' | 'burgers' | 'shawarma' | 'plates' | 'sides' | 'drinks';

export const MenuSection: React.FC<MenuSectionProps> = ({ onSelectDish }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');

  const categories: { id: CategoryType; label: string; count: number }[] = [
    { id: 'all', label: 'FULL MENU', count: MENU_ITEMS.length },
    { id: 'burgers', label: 'FLAME BURGERS', count: MENU_ITEMS.filter(i => i.category === 'burgers').length },
    { id: 'shawarma', label: 'TOUM SHAWARMA', count: MENU_ITEMS.filter(i => i.category === 'shawarma').length },
    { id: 'plates', label: 'SYRIAN PLATES', count: MENU_ITEMS.filter(i => i.category === 'plates').length },
    { id: 'sides', label: 'ARTISANAL SIDES', count: MENU_ITEMS.filter(i => i.category === 'sides').length },
    { id: 'drinks', label: 'CRAFT ELIXIRS', count: MENU_ITEMS.filter(i => i.category === 'drinks').length },
  ];

  const filteredItems = activeCategory === 'all'
    ? MENU_ITEMS
    : MENU_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="menu" className="relative py-28 bg-[#0B0B0C] border-t border-zinc-900 overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#9B2226]/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-left space-y-3">
            <span className="text-xs font-mono tracking-widest text-[#D4AF37] uppercase flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              SYRIAN CULINARY REPERTOIRE
            </span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl uppercase tracking-tighter text-white">
              EDITORIAL <span className="text-gradient-ember">GASTRONOMY</span> MENU
            </h2>
          </div>

          <p className="text-sm text-zinc-400 font-light max-w-md text-left md:text-right">
            Hand-crafted daily using 72-hour marinades, authentic Aleppo spices, oak charcoal grilling, and stone-ground sesame tahini.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-12 scrollbar-none border-b border-zinc-800">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`whitespace-nowrap px-5 py-3 text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-2 border cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#9B2226] text-white border-[#9B2226] shadow-[0_0_15px_rgba(155,34,38,0.4)]'
                  : 'bg-[#141417] text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-white'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded ${activeCategory === cat.id ? 'bg-black/40 text-white' : 'bg-zinc-800 text-zinc-400'}`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectDish(item)}
              className="group relative bg-[#121215] border border-zinc-800/80 hover:border-[#9B2226]/50 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
            >
              {/* Top Dish Image Frame */}
              <div className="relative w-full h-52 bg-black rounded-lg overflow-hidden mb-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121215] via-transparent to-transparent opacity-80" />
                
                {/* Price Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-black/80 backdrop-blur-md border border-zinc-700 rounded-full font-mono text-sm font-bold text-[#F7F4EF]">
                  ${item.price.toFixed(2)}
                </div>

                {/* Dietary Tags */}
                <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                  {item.dietary?.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-[#9B2226]/80 text-white text-[10px] font-mono uppercase tracking-wider rounded-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Item Content */}
              <div className="flex flex-col text-left flex-grow">
                <div className="flex items-baseline justify-between gap-2 mb-1">
                  <h3 className="font-display font-bold text-lg text-white group-hover:text-[#E63946] transition-colors">
                    {item.name}
                  </h3>
                </div>
                <p className="font-arabic text-sm text-[#D4AF37]/90 mb-3">{item.arabicName}</p>

                <p className="text-xs text-zinc-400 font-light line-clamp-2 leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Key Taste Notes Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
                  {item.tasteNotes.slice(0, 3).map((note) => (
                    <span key={note} className="text-[10px] font-mono text-zinc-500 bg-zinc-900 px-2 py-1 rounded border border-zinc-800">
                      • {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-400 group-hover:text-white">
                <span className="flex items-center gap-1.5 text-[#D4AF37]">
                  <Info className="w-3.5 h-3.5" />
                  VIEW TASTE DETAILS
                </span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
