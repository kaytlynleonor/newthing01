import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../../context/StoreContext';
import { Search, ShoppingBag, Heart, User, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeView,
    navigateFromNavbar,
    cartCount,
    wishlist,
    setIsCartOpen,
    isSearchOpen,
    setIsSearchOpen,
    isAccountOpen,
    setIsAccountOpen,
    activeCategoryFilter
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClosingMenu, setIsClosingMenu] = useState(false);
  const menuCloseTimer = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (menuCloseTimer.current !== null) window.clearTimeout(menuCloseTimer.current);
    };
  }, []);

  const isHeroOverlayPage = activeView === 'home' && !isScrolled;

  // Keep the transparent overlay limited to the default catalogue view or beauty view.
  const isShopCataloguePage = activeView === 'shop' && (activeCategoryFilter === 'ALL' || activeCategoryFilter === 'BEAUTY');
  const showImageBackground = isShopCataloguePage && !isScrolled && !isSearchOpen;

  const openMenu = () => {
    if (menuCloseTimer.current !== null) {
      window.clearTimeout(menuCloseTimer.current);
      menuCloseTimer.current = null;
    }
    setIsClosingMenu(false);
    setMobileMenuOpen(true);
  };

  const closeMenu = () => {
    if (!mobileMenuOpen || isClosingMenu) return;
    setIsClosingMenu(true);
    menuCloseTimer.current = window.setTimeout(() => {
      setMobileMenuOpen(false);
      setIsClosingMenu(false);
      menuCloseTimer.current = null;
    }, 320);
  };

  const forceCloseMenu = () => {
    if (menuCloseTimer.current !== null) {
      window.clearTimeout(menuCloseTimer.current);
      menuCloseTimer.current = null;
    }
    setIsClosingMenu(false);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleCloseMobileMenu = () => forceCloseMenu();
    window.addEventListener('kl-close-mobile-menu', handleCloseMobileMenu);
    return () => window.removeEventListener('kl-close-mobile-menu', handleCloseMobileMenu);
  }, []);

  const openAccount = () => {
    forceCloseMenu();
    setIsAccountOpen(true);
  };

  const isMenuIconOpen = mobileMenuOpen && !isClosingMenu;

  const navigateTo = (view: string, category: string = 'ALL') => {
    navigateFromNavbar(view, category);
    closeMenu();
  };

  const goHomeFromNavbar = () => {
    navigateFromNavbar('home');
    closeMenu();
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ease-in-out ${
          activeView === 'product' ? 'bg-white text-[#11100E] border-b border-[#EEE8DF] shadow-sm py-2 md:py-2.5' :
          showImageBackground
            ? 'bg-transparent text-[#F5F1EB] border-b border-transparent shadow-none py-2 md:py-2.5 md:hover:bg-white md:hover:text-[#11100E] md:hover:border-[#EEE8DF] md:hover:shadow-sm'
            : 'bg-white text-[#11100E] border-b border-[#EEE8DF] shadow-sm py-2 md:py-2.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative flex items-center justify-between min-h-[58px]">
          
          {/* Desktop Left Nav */}
          <nav className="hidden lg:flex items-center gap-7 text-[11px] font-sans tracking-[0.2em] font-medium">
            <button
              onClick={() => navigateTo('home')}
              className="editorial-link transition-colors hover:text-[#A99684]"
            >
              HOME
            </button>
            <button
              onClick={() => navigateTo('shop', 'ALL')}
              className="editorial-link transition-colors hover:text-[#A99684]"
            >
              SHOP
            </button>
            <button
              onClick={() => navigateTo('shop', 'NEW ARRIVALS')}
              className="editorial-link transition-colors hover:text-[#A99684]"
            >
              NEW
            </button>
            <button
              onClick={() => navigateTo('shop', 'COLLECTIONS')}
              className="editorial-link transition-colors hover:text-[#A99684]"
            >
              COLLECTIONS
            </button>
            <button
              onClick={() => navigateTo('journal')}
              className="editorial-link transition-colors hover:text-[#A99684]"
            >
              JOURNAL
            </button>
          </nav>

          {/* Mobile Hamburger / Close Toggle */}
          <button
            onClick={() => (mobileMenuOpen && !isClosingMenu ? closeMenu() : openMenu())}
            className="lg:hidden absolute right-5 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center focus:outline-none"
            aria-label={isMenuIconOpen ? 'Close mobile menu' : 'Open mobile menu'}
            aria-expanded={isMenuIconOpen}
          >
            <span className={`absolute left-1/2 top-1/2 h-[1.5px] w-6 -translate-x-1/2 bg-current transition-all duration-300 ${isMenuIconOpen ? 'translate-y-0 rotate-45' : '-translate-y-2'}`} />
            <span className={`absolute left-1/2 top-1/2 h-[1.5px] w-6 -translate-x-1/2 bg-current transition-all duration-200 ${isMenuIconOpen ? 'scale-x-0 opacity-0' : 'scale-x-100 opacity-100'}`} />
            <span className={`absolute left-1/2 top-1/2 h-[1.5px] w-6 -translate-x-1/2 bg-current transition-all duration-300 ${isMenuIconOpen ? 'translate-y-0 -rotate-45' : 'translate-y-2'}`} />
          </button>

          {/* Center Brand Logo — absolutely centered so it never shifts */}
          <button
            type="button"
            className="absolute left-1/2 -translate-x-1/2 flex items-center cursor-pointer select-none group pointer-events-auto z-50 bg-transparent border-0 p-0"
            onClick={goHomeFromNavbar}
            aria-label="Go to home"
          >
            <img
              src="/Luxury%20Gold%20KL%20Monogram%20Logo.png"
              alt="Kaytlyn Leonor"
              className="h-12 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </button>

          {/* Desktop Right Actions — hidden on mobile since the lower bar handles them */}
          <div className="hidden lg:flex items-center gap-1 md:gap-2 text-[11px] font-sans tracking-[0.2em] ml-auto lg:ml-0">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="group flex items-center gap-1.5 py-1.5 px-2.5 rounded-full hover:bg-[#A99684]/15 transition-all duration-300"
              aria-label="Search site"
              aria-expanded={isSearchOpen}
              title="Search"
            >
              <Search size={18} strokeWidth={1.5} className="shrink-0 transition-transform duration-300 group-hover:scale-110" />
              <span className="max-w-0 opacity-0 group-hover:max-w-[100px] group-hover:opacity-100 transition-all duration-300 ease-out overflow-hidden whitespace-nowrap uppercase text-[10px] font-medium tracking-[0.2em] pl-0.5">
                Search
              </span>
            </button>

            {/* Account */}
            <button
              onClick={() => setIsAccountOpen(true)}
              className="group flex items-center gap-1.5 py-1.5 px-2.5 rounded-full hover:bg-[#A99684]/15 transition-all duration-300"
              aria-label="Account"
              title="Account"
            >
              <User size={18} strokeWidth={1.5} className="shrink-0 transition-transform duration-300 group-hover:scale-110" />
              <span className="max-w-0 opacity-0 group-hover:max-w-[100px] group-hover:opacity-100 transition-all duration-300 ease-out overflow-hidden whitespace-nowrap uppercase text-[10px] font-medium tracking-[0.2em] pl-0.5">
                Account
              </span>
            </button>

            {/* Wishlist */}
            <button
              onClick={() => navigateTo('wishlist')}
              className="group relative flex items-center gap-1.5 py-1.5 px-2.5 rounded-full hover:bg-[#A99684]/15 transition-all duration-300"
              aria-label="Wishlist"
              title="Wishlist"
            >
              <div className="relative shrink-0">
                <Heart size={18} strokeWidth={1.5} className="transition-transform duration-300 group-hover:scale-110" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#11100E] text-[#F5F1EB] text-[9px] font-semibold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                    {wishlist.length}
                  </span>
                )}
              </div>
              <span className="max-w-0 opacity-0 group-hover:max-w-[100px] group-hover:opacity-100 transition-all duration-300 ease-out overflow-hidden whitespace-nowrap uppercase text-[10px] font-medium tracking-[0.2em] pl-0.5">
                Wishlist
              </span>
            </button>

            {/* Bag */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="group relative flex items-center gap-1.5 py-1.5 px-2.5 rounded-full hover:bg-[#A99684]/15 transition-all duration-300"
              aria-label="Shopping Bag"
              title="Shopping Bag"
            >
              <div className="relative shrink-0">
                <ShoppingBag size={18} strokeWidth={1.5} className="transition-transform duration-300 group-hover:scale-110" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#A99684] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center shadow-sm">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="max-w-0 opacity-0 group-hover:max-w-[100px] group-hover:opacity-100 transition-all duration-300 ease-out overflow-hidden whitespace-nowrap uppercase text-[10px] font-medium tracking-[0.2em] pl-0.5">
                Bag
              </span>
            </button>

          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {(mobileMenuOpen || isClosingMenu) && (
        <div className={`fixed inset-0 z-50 bg-[#11100E]/80 backdrop-blur-md ${isClosingMenu ? 'animate-fade-out' : 'animate-fade-in'}`}>
          <div className={`w-full h-full bg-[#F5F1EB] text-[#11100E] flex flex-col shadow-2xl border-l border-[#EEE8DF] ${isClosingMenu ? 'animate-slide-out-right' : 'animate-slide-in-right'}`}>
            <div className="shrink-0 px-8 pt-8 pb-6 flex items-center justify-between border-b border-[#EEE8DF]">
              <span className="font-serif text-xl tracking-[0.25em] font-light">KAYTLYN LEONOR</span>
              <button onClick={closeMenu} className="p-1 text-[#11100E]" aria-label="Close mobile menu">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-8 py-8">
              <div className="flex flex-col gap-6 text-sm font-sans tracking-[0.25em] uppercase font-medium">
                {[
                  { label: 'HOME', action: () => navigateTo('home') },
                  { label: 'NEW ARRIVALS', action: () => navigateTo('shop', 'NEW ARRIVALS') },
                  { label: 'SHOP ALL', action: () => navigateTo('shop', 'ALL') },
                  { label: 'SIGNATURE', action: () => navigateTo('shop', 'SIGNATURE') },
                  { label: 'HANDBAGS', action: () => navigateTo('shop', 'BAGS') },
                  { label: 'SHOES', action: () => navigateTo('shop', 'SHOES') },
                  { label: 'BEAUTY & FRAGRANCE', action: () => navigateTo('shop', 'BEAUTY') },
                  { label: 'THE JOURNAL', action: () => navigateTo('journal') },
                  { label: 'ACCOUNT', action: openAccount },
                  { label: 'WISHLIST', action: () => navigateTo('wishlist'), badge: wishlist.length }
                ].map((item, index) => (
                  <button
                    key={item.label}
                    onClick={item.action}
                    className={`text-left py-3 border-b border-[#EEE8DF]/60 hover:text-[#A99684] ${isClosingMenu ? 'opacity-0' : 'opacity-100'} ${isClosingMenu ? '' : 'animate-menu-item'}`}
                    style={isClosingMenu ? undefined : { animationDelay: `${index * 70}ms` }}
                  >
                    <span className="flex items-center justify-between gap-4">
                      <span>{item.label}</span>
                      {item.badge !== undefined && (
                        <span className="text-xs bg-[#11100E] text-[#F5F1EB] px-2 py-0.5 rounded-full">{item.badge}</span>
                      )}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
