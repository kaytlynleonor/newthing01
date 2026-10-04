import React from 'react';
import { Camera } from 'lucide-react';

const SOCIAL_POSTS = [
  {
    id: 's-1',
    image: '/assets/images/hero_campaign_1.jpg',
    handle: '@kaytlynleonor',
    caption: 'Atelier Double-Breasted Silk Coat in Warm Ivory.'
  },
  {
    id: 's-2',
    image: '/Leonor%20Kaytlyn%20Luxury%20Packaging%20Still%20Life.png',
    handle: '@kaytlynleonor',
    caption: 'Florentine calfskin leather craftsmanship.'
  },
  {
    id: 's-3',
    image: '/assets/images/category_shoes.jpg',
    handle: '@kaytlynleonor',
    caption: 'Italian duchess satin pumps.'
  },
  {
    id: 's-4',
    image: '/assets/images/category_beauty.jpg',
    handle: '@kaytlynleonor',
    caption: 'Aurelia Eau de Parfum & Velvet Rouge Shade 01.'
  },
  {
    id: 's-5',
    image: '/assets/images/campaign_editorial_2.jpg',
    handle: '@kaytlynleonor',
    caption: 'Backless silk gown captured in Puglia.'
  },
  {
    id: 's-6',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=1200',
    handle: '@kaytlynleonor',
    caption: '18k gold vermeil and South Sea baroque pearls.'
  }
];

export const SocialGallery: React.FC = () => {
  return (
    <section className="py-20 md:py-28 px-6 lg:px-12 bg-[#F5F1EB]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[11px] font-sans uppercase tracking-[0.4em] text-[#A99684]">
            INSTAGRAM EDITORIAL
          </span>
          <h2 className="font-serif text-2xl md:text-4xl tracking-[0.2em] uppercase mt-1 font-light">
            @KAYTLYNLEONOR
          </h2>
        </div>

        {/* 6 Grid Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {SOCIAL_POSTS.map((post) => (
            <a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden bg-[#EEE8DF] cursor-pointer"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Hover Dark Overlay with Instagram Icon & Caption */}
              <div className="absolute inset-0 bg-[#11100E]/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center text-[#F5F1EB]">
                <Camera size={22} className="text-[#D8C8B7] mb-2" />
                <p className="text-[10px] font-sans tracking-wider text-[#EEE8DF] line-clamp-2">
                  {post.caption}
                </p>
                <span className="text-[9px] font-sans tracking-[0.2em] text-[#A99684] uppercase mt-2">
                  VIEW ON INSTAGRAM
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
