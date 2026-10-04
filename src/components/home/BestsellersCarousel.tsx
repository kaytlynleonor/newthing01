import React, { useRef } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../product/ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const BestsellersCarousel: React.FC = () => {
  const { products } = useStore();
  const carouselRef = useRef<HTMLDivElement>(null);

  const bestsellers = products.filter((p) => p.isBestseller || p.rating >= 4.9);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -360 : 360;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 md:py-32 px-6 lg:px-12 bg-[#F5F1EB] overflow-hidden border-b border-[#EEE8DF]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[11px] font-sans uppercase tracking-[0.4em] text-[#A99684]">
              ICONIC CREATIONS
            </span>
            <h2 className="font-serif text-3xl md:text-5xl tracking-[0.2em] uppercase mt-1 font-light">
              SIGNATURE PIECES
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 border border-[#11100E] flex items-center justify-center text-[#11100E] hover:bg-[#11100E] hover:text-[#F5F1EB] transition-colors"
              aria-label="Previous item"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 border border-[#11100E] flex items-center justify-center text-[#11100E] hover:bg-[#11100E] hover:text-[#F5F1EB] transition-colors"
              aria-label="Next item"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Carousel Drag/Swipe Scroll Container */}
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-4"
        >
          {bestsellers.map((product) => (
            <div
              key={product.id}
              className="w-[280px] sm:w-[320px] md:w-[360px] shrink-0 snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
