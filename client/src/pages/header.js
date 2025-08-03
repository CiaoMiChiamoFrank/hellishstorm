import React, { useState } from 'react';
import {Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * Componente Header
 * Gestisce la barra di navigazione superiore, inclusa la logica per il menu mobile.
 * Utilizza Tailwind CSS per lo stile e le icone di Lucide per gli elementi visivi.
 */
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Funzioni di gestione dei click (segnaposto)
  const handleShopClick = () => {
    console.log('Naviga a SHOP');
    navigate('/catalogo');
  };

  const handleAboutClick = () => {
    console.log('Naviga ad ABOUT');

  };

  const handleContactClick = () => {
    console.log('Naviga a CONTACT');
    navigate('/contatti');
  };

  return (
    <header className="border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo del brand */}
          <div className="text-xl font-normal tracking-wider text-black">
            HELLISHSTORM
          </div>

          {/* Contenitore per navigazione e icone (desktop) */}
          <div className="flex items-center space-x-6 md:space-x-8">
            {/* Navigazione per desktop */}
            <nav className="hidden md:flex items-center space-x-6">
              <button
                className="text-sm text-gray-700 hover:text-black transition-colors"
                onClick={handleShopClick}
              >
                SHOP
              </button>
              <button
                className="text-sm text-gray-700 hover:text-black transition-colors"
                onClick={handleAboutClick}
              >
                ABOUT
              </button>
              <button
                className="text-sm text-gray-700 hover:text-black transition-colors"
                onClick={handleContactClick}
              >
                CONTACT
              </button>
            </nav>

            {/* Icone e pulsante per menu mobile */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5 text-gray-700" />
                ) : (
                  <Menu className="h-5 w-5 text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Menu mobile (visibile solo su schermi piccoli) */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <nav className="flex flex-col space-y-4">
              <button
                className="text-sm text-gray-700 hover:text-black transition-colors text-left"
                onClick={handleShopClick}
              >
                SHOP
              </button>
              <button
                className="text-sm text-gray-700 hover:text-black transition-colors text-left"
                onClick={handleAboutClick}
              >
                ABOUT
              </button>
              <button
                className="text-sm text-gray-700 hover:text-black transition-colors text-left"
                onClick={handleContactClick}
              >
                CONTACT
              </button>
              <div className="flex items-center space-x-4 pt-4 border-t border-gray-100">
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
