import React, { useState } from 'react';
import type { MenuItem } from '../data/menuData';
import { X, Flame, ShoppingBag, Check, Plus, Minus } from 'lucide-react';

interface DishModalProps {
  dish: MenuItem | null;
  onClose: () => void;
  onAddToBag: (item: MenuItem, qty: number) => void;
}

export const DishModal: React.FC<DishModalProps> = ({ dish, onClose, onAddToBag }) => {
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!dish) return null;

  const handleAdd = () => {
    onAddToBag(dish, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-[#141418] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/70 text-zinc-300 hover:text-white border border-zinc-700 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Image Banner */}
        <div className="relative h-64 sm:h-72 w-full bg-black">
          <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141418] via-transparent to-transparent opacity-90" />
          
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div>
              <span className="font-arabic text-base text-[#D4AF37] block">{dish.arabicName}</span>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white uppercase leading-tight">
                {dish.name}
              </h3>
            </div>
            <div className="font-mono text-2xl font-black text-[#E63946]">
              ${(dish.price * quantity).toFixed(2)}
            </div>
          </div>
        </div>

        {/* Modal Scrollable Content Body */}
        <div className="p-6 sm:p-8 space-y-6 text-left overflow-y-auto">
          
          {/* Dietary Badges */}
          <div className="flex flex-wrap items-center gap-2">
            {dish.dietary?.map((tag) => (
              <span key={tag} className="px-2.5 py-1 bg-[#9B2226] text-white text-xs font-mono uppercase tracking-wider rounded">
                {tag}
              </span>
            ))}
            {dish.spicyLevel !== undefined && dish.spicyLevel > 0 && (
              <span className="px-2.5 py-1 bg-amber-950 border border-amber-800 text-amber-300 text-xs font-mono flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-500 fill-current" />
                SPICE LEVEL {dish.spicyLevel}/3
              </span>
            )}
            {dish.calories && (
              <span className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-mono">
                {dish.calories} CAL
              </span>
            )}
          </div>

          {/* Detailed Narrative Description */}
          <p className="text-sm text-zinc-300 font-light leading-relaxed">
            {dish.longDescription}
          </p>

          {/* Ingredient Composition */}
          <div className="space-y-2 pt-2 border-t border-zinc-800">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] block">
              INGREDIENT & CULINARY PROFILE
            </span>
            <div className="flex flex-wrap gap-2">
              {dish.ingredients.map((ing) => (
                <span key={ing} className="px-3 py-1 bg-[#1A1A20] border border-zinc-800 text-xs font-sans text-zinc-300">
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Taste Notes */}
          <div className="space-y-2 pt-2 border-t border-zinc-800">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block">
              TASTE PALETTE NOTES
            </span>
            <div className="flex flex-wrap gap-2">
              {dish.tasteNotes.map((note) => (
                <span key={note} className="px-3 py-1 bg-zinc-900 text-xs font-mono text-zinc-400 border border-zinc-800">
                  • {note}
                </span>
              ))}
            </div>
          </div>

          {/* Quantity Selector & Add Button */}
          <div className="pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center border border-zinc-700 bg-black/50 rounded-lg p-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-zinc-800 rounded"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center font-mono font-bold text-sm text-white">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-zinc-800 rounded"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleAdd}
              disabled={addedSuccess}
              className={`w-full sm:w-auto flex-grow py-3.5 px-8 font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 ${
                addedSuccess
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#9B2226] hover:bg-[#B71C1C] text-white shadow-[0_0_20px_rgba(155,34,38,0.5)]'
              }`}
            >
              {addedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  ADDED TO SELECTION!
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  ADD TO SELECTION — ${(dish.price * quantity).toFixed(2)}
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
