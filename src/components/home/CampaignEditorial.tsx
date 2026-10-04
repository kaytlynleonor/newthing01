import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Sparkles } from 'lucide-react';

export const CampaignEditorial: React.FC = () => {
  const { setActiveView } = useStore();

  return (
    <section className="relative w-full py-32 md:py-48 px-6 lg:px-12 bg-[#11100E] text-[#F5F1EB] overflow-hidden">
      {/* Background Campaign Imagery with Vignette */}
      <div 
        className="absolute inset-0 w-full h-full opacity-45 bg-cover bg-center"
        style={{ backgroundImage: `url('/assets/images/campaign_editorial_2.jpg')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#11100E] via-[#11100E]/70 to-[#11100E]/40" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#A99684]/50 rounded-full text-[10px] font-sans tracking-[0.3em] text-[#D8C8B7] uppercase">
          <Sparkles size={12} /> THE KAYTLYN LEONOR WOMAN
        </div>

        <h2 className="font-serif text-3xl md:text-5xl lg:text-7xl font-extralight tracking-[0.15em] uppercase leading-tight">
          "DEFINED BY CONFIDENCE.
          <br />
          CREATED WITH INTENTION."
        </h2>

        <p className="text-xs md:text-sm font-sans tracking-[0.2em] text-[#C8B5A5] max-w-xl mx-auto font-light uppercase">
          A timeless expression of contemporary silhouette, Italian fabrics, and effortless poise.
        </p>

        <div className="pt-4">
          <button
            onClick={() => setActiveView('journal')}
            className="inline-block border border-[#F5F1EB] hover:bg-[#F5F1EB] hover:text-[#11100E] px-10 py-4 text-xs font-sans uppercase tracking-[0.3em] transition-colors"
          >
            DISCOVER THE STORY
          </button>
        </div>
      </div>
    </section>
  );
};
