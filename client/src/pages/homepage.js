import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import homepageImage from './img/home.JPG';
import { useNavigate } from 'react-router-dom';

export default function HellishStormHomepage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const image = homepageImage;
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleShopClick = () => {
    navigate('/catalogo');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className={`min-h-screen bg-white transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="text-xl sm:text-2xl font-light text-black tracking-widest">
              HELLISHSTORM
            </div>

            {/* Desktop Nav */}
            <nav className="hidden sm:block">
              <button
                onClick={handleShopClick}
                className="text-black font-light tracking-wide hover:text-gray-600 transition-colors duration-300 text-sm sm:text-base"
              >
                SHOP
              </button>
            </nav>

            {/* Mobile Menu Icon */}
            <div className="sm:hidden">
              <button onClick={toggleMobileMenu} className="text-black">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Nav */}
          {isMobileMenuOpen && (
            <div className="sm:hidden mt-2">
              <button
                onClick={() => {
                  handleShopClick();
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left text-black font-light tracking-wide hover:text-gray-600 transition-colors duration-300 text-sm py-2"
              >
                SHOP
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 sm:pt-24">
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6">
          <div className="w-full max-w-4xl text-center">
            {/* Main Image */}
            <div className="mb-8">
              <div className=" bg-gradient-to-br from-gray-100 to-gray-300 rounded-md overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-500">
                <img 
                  src={image} 
                  alt="HellishStorm Collection" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full hidden items-center justify-center">
                  <div className="text-center px-4">
                    <div className="text-4xl sm:text-6xl font-light text-gray-400 mb-2 tracking-widest">
                      HELLISHSTORM
                    </div>
                    <div className="text-base sm:text-lg text-gray-500 font-light">
                      STREETWEAR COLLECTION 2025
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Subtitle & CTA */}
            <div className="space-y-4 px-2">
              <h1 className="text-3xl sm:text-5xl font-light text-black tracking-wide leading-snug">
                UNLEASH THE STORM
              </h1>
              <p className="text-base sm:text-lg text-gray-600 font-light max-w-2xl mx-auto">
                Discover our latest collection. Raw streetwear meets contemporary design.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="text-center">
            <p className="text-xs text-gray-500">
              © 2025 HELLISHSTORM. All rights reserved.
            </p>
          </div>
        </div>
      </footer> 
    </div>
  );
}
