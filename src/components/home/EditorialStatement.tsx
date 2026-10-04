import React from 'react';

export const EditorialStatement: React.FC = () => {
  return (
    <section className="py-24 md:py-36 px-6 lg:px-12 bg-[#F5F1EB] text-center border-b border-[#EEE8DF]">
      <div className="max-w-4xl mx-auto space-y-6">
        <span className="block text-[11px] font-sans uppercase tracking-[0.4em] text-[#A99684] font-medium">
          THE PHILOSOPHY
        </span>
        
        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light text-[#11100E] tracking-[0.15em] uppercase leading-tight">
          "AN EXPRESSION OF MODERN FEMININITY."
        </h2>

        <div className="w-12 h-[1px] bg-[#A99684]/50 mx-auto my-6" />

        <p className="font-sans text-xs md:text-sm text-[#2C2925] tracking-[0.15em] leading-relaxed max-w-2xl mx-auto font-light">
          Kaytlyn Leonor is created for the woman defined by quiet confidence. 
          We merge uncompromised Italian craftsmanship with clean, architectural silhouettes designed to transcend seasons.
        </p>
      </div>
    </section>
  );
};
