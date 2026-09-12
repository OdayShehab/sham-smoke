import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './components/Navbar';
import { BurgerHero } from './components/BurgerHero';
import { MenuSection } from './components/MenuSection';
import { SignatureDishes } from './components/SignatureDishes';
import { BrandStory } from './components/BrandStory';
import { LocationsSection } from './components/LocationsSection';
import { Footer } from './components/Footer';
import { DishModal } from './components/DishModal';
import { MENU_ITEMS, type MenuItem } from './data/menuData';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);

  /**
   * Initialize Lenis smooth scroll AND connect it to GSAP ScrollTrigger.
   * 
   * CRITICAL: Without this bridge, Lenis intercepts wheel/touch events
   * and transforms them into its own smooth scroll. GSAP ScrollTrigger
   * never sees scroll updates, so the pinned hero video scrub breaks.
   * 
   * The fix: on every Lenis scroll event, call ScrollTrigger.update()
   * so GSAP recalculates all trigger positions and progress values.
   */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Bridge: pipe every Lenis scroll tick into GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Sync Lenis into GSAP's global ticker so both run on the same rAF loop
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); // GSAP ticker uses seconds, Lenis expects ms
    });
    gsap.ticker.lagSmoothing(0); // Prevent GSAP from skipping frames

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf as any);
    };
  }, []);

  const handleExploreMenu = () => {
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenOrderModal = () => {
    setSelectedDish(MENU_ITEMS[0]);
  };

  const handleAddToBag = (_item: MenuItem, _qty: number) => {
    // Selection handled in modal
  };

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-[#F7F4EF] selection:bg-[#9B2226] selection:text-white">
      {/* Navigation Header */}
      <Navbar onOpenOrderModal={handleOpenOrderModal} />

      {/* Main Content Sections */}
      <main>
        {/* Pinned Hero Section with Scroll Video Scrubbing */}
        <BurgerHero onExploreMenu={handleExploreMenu} />

        {/* Editorial Menu */}
        <MenuSection onSelectDish={(dish) => setSelectedDish(dish)} />

        {/* Flagship Signature Dishes */}
        <SignatureDishes onSelectDish={(dish) => setSelectedDish(dish)} />

        {/* Heritage & Brand Story */}
        <BrandStory />

        {/* Locations & Opening Hours */}
        <LocationsSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Dish View & Quick Order Modal */}
      <DishModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        onAddToBag={handleAddToBag}
      />
    </div>
  );
}

export default App;
