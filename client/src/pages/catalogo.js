import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from './header';

export default function HellishStormCatalog() {
  const [selectedCategory, setSelectedCategory] = useState('New Drop');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const categories = ['New Drop', 'T-Shirt', 'Felpe', 'Jeans', 'Accessori'];
    const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/shop/catalogo/visualizza', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ catalogo: selectedCategory }),
        });

        const data = await response.json();
        if (data.bool) {
          setProducts(data.prodotti);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error('Errore nel prelievo dei prodotti:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const handleProductClick = (productId) => {
    navigate(`/prodotto/${productId}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <Header />  
      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-normal text-black tracking-wide mb-2">NEW ARRIVALS</h1>
          <p className="text-sm text-gray-600">Streetwear essentials, worldwide since 2025</p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`text-sm font-normal tracking-wide transition-colors pb-1 ${
                  selectedCategory === category
                    ? 'text-black border-b border-black'
                    : 'text-gray-500 hover:text-black'
                }`}
              >
                {category.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-sm">Caricamento prodotti...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                onClick={() => handleProductClick(product._id)}
                className="group cursor-pointer"
              >
                <div className="aspect-[3/4] bg-gray-100 mb-3 overflow-hidden">
                  <img
                    src={product.immagini && product.immagini.length > 0 ? product.immagini[0] : ''}
                    alt={product.titolo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full flex items-center justify-center bg-gray-100" style={{ display: 'none' }}>
                    <span className="text-xs text-gray-400 font-normal">{product.titolo}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-normal text-black group-hover:text-gray-600 transition-colors">
                    {product.titolo}
                  </h3>
                  <p className="text-sm text-gray-600">€{product.prezzo.toFixed(2)}</p>
                  {product.catalogo.includes('New Drop') && (
                    <span className="inline-block text-xs text-red-600 font-normal">NEW</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 text-sm">NESSUN RISULTATO TROVATO</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="text-center">
            <p className="text-xs text-gray-500">© 2025 HELLISHSTORM. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
