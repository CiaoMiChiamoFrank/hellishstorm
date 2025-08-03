import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import Header from './header';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/shop/catalogo/${id}`);
        const data = await res.json();
        if (data.bool) {
          setProduct(data.prodotto);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error('Errore fetch prodotto:', error);
        setProduct(null);
      }
    };
    fetchProduct();
  }, [id]);

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.immagini.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.immagini.length - 1 : prev - 1
    );
  };

  const goToImage = (index) => setCurrentImageIndex(index);

  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    const distance = touchStart - touchEnd;
    if (distance > 50) nextImage();
    if (distance < -50) prevImage();
  };

  const handleVintedClick = () => {
    if (product?.vintedUrl) window.open(product.vintedUrl, '_blank');
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
          <p className="text-gray-600">Caricamento prodotto...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-100 overflow-hidden">
              <img
                src={product.immagini[currentImageIndex]}
                alt={`${product.titolo} - ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              />
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
              >
                <ChevronLeft className="h-5 w-5 text-gray-700" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
              >
                <ChevronRight className="h-5 w-5 text-gray-700" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black text-white px-3 py-1 rounded-full text-xs">
                {currentImageIndex + 1} / {product.immagini.length}
              </div>
            </div>

            <div className="flex space-x-2 overflow-x-auto pb-2">
              {product.immagini.map((img, i) => (
                <button
                  key={i}
                  onClick={() => goToImage(i)}
                  className={`w-20 h-20 border-2 ${
                    currentImageIndex === i ? 'border-black' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt={`thumb ${i}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-light text-black">{product.titolo}</h1>
              <div className="text-2xl font-normal text-black">€{product.prezzo.toFixed(2)}</div>
            </div>

            <div>
              <h2 className="text-lg font-normal text-black mb-4">DESCRIZIONE</h2>
              <p className="text-gray-600">{product.descrizione}</p>
            </div>

            <div>
              <h2 className="text-lg font-normal text-black mb-4">DETTAGLI</h2>
              <ul className="text-sm text-gray-600 space-y-2">
                {product.dettagli?.map((d, i) => <li key={i}>• {d}</li>)}
              </ul>
            </div>

            {/* Aumento lo spazio sopra il pulsante per posizionarlo più in basso */}
            <div className="pt-8">
              <button
                onClick={handleVintedClick}
                className="w-full bg-black text-white py-4 px-8 text-lg font-normal flex items-center justify-center space-x-3"
              >
                <span>ACQUISTA SU VINTED</span>
                <ExternalLink className="h-5 w-5" />
              </button>
              <p className="text-xs text-gray-500 mt-3 text-center">
                Sarai reindirizzato al nostro store Vinted
              </p>
            </div>
          </div>
        </div>
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
