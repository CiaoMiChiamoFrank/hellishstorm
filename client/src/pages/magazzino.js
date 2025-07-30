import React, { useEffect, useState } from 'react';
import { LogOut, Trash2, Edit3, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

export default function WarehousePage() {
  const [username, setUsername] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  // Dati finti, eventualmente sostituibili con fetch da DB
   const [products, setProducts] = useState([
    {
      id: 1,
      nome: 'Abito',
      magazzino: 'Disponibile',
      prezzo: '45.50€',
      categoria: 'Abiti',
      data: '25/07/2025 alle 19:09',
      image: '/api/placeholder/60/80'
    },
    {
      id: 2,
      nome: 'Tuta',
      magazzino: 'Disponibile',
      prezzo: '55.30€',
      categoria: 'Abiti, Pantaloni',
      data: '25/07/2025 alle 19:06',
      image: '/api/placeholder/60/80'
    },
    {
      id: 3,
      nome: 'Abito',
      magazzino: 'Disponibile',
      prezzo: '59.50€',
      categoria: 'Abiti',
      data: '25/07/2025 alle 19:03',
      image: '/api/placeholder/60/80'
    },
    {
      id: 4,
      nome: 'Gonna',
      magazzino: 'Disponibile',
      prezzo: '90.30€',
      categoria: 'Gonne',
      data: '25/07/2025 alle 18:58',
      image: '/api/placeholder/60/80'
    },
    {
      id: 5,
      nome: 'Top',
      magazzino: 'Disponibile',
      prezzo: '97.30€',
      categoria: 'Top',
      data: '25/07/2025 alle 18:56',
      image: '/api/placeholder/60/80'
    },
    {
      id: 6,
      nome: 'Completo',
      magazzino: 'Disponibile',
      prezzo: '83.30€',
      categoria: 'Abiti',
      data: '25/07/2025 alle 18:54',
      image: '/api/placeholder/60/80'
    },
    {
      id: 7,
      nome: 'Gonna',
      magazzino: 'Disponibile',
      prezzo: '118.30€',
      categoria: 'Gonne',
      data: '25/07/2025 alle 18:51',
      image: '/api/placeholder/60/80'
    },
    {
      id: 8,
      nome: 'Kimono',
      magazzino: 'Disponibile',
      prezzo: '132.30€',
      categoria: 'Giacche',
      data: '25/07/2025 alle 18:49',
      image: '/api/placeholder/60/80'
    },
    {
      id: 9,
      nome: 'Jeans',
      magazzino: 'Disponibile',
      prezzo: '59.50€',
      categoria: 'Pantaloni',
      data: '25/07/2025 alle 18:46',
      image: '/api/placeholder/60/80'
    },
    {
      id: 10,
      nome: 'Giacca',
      magazzino: 'Disponibile',
      prezzo: '125.00€',
      categoria: 'Giacche',
      data: '25/07/2025 alle 18:40',
      image: '/api/placeholder/60/80'
    },
    {
      id: 11,
      nome: 'Camicia',
      magazzino: 'Disponibile',
      prezzo: '42.90€',
      categoria: 'Camicie',
      data: '25/07/2025 alle 18:35',
      image: '/api/placeholder/60/80'
    },
    {
      id: 12,
      nome: 'Pantalone',
      magazzino: 'Disponibile',
      prezzo: '67.80€',
      categoria: 'Pantaloni',
      data: '25/07/2025 alle 18:30',
      image: '/api/placeholder/60/80'
    }
  ]);

  // Effetto iniziale per animazione e nome admin
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUsername(payload.nome || 'Admin');
      } catch (err) {
        console.error('Token non valido:', err);
        setUsername('Admin');
      }
    } else {
      setUsername('Admin');
    }

    // Mostra messaggio di benvenuto
    setTimeout(() => setShowWelcome(false), 3000);
    // Mostra il contenuto dopo l'animazione
    setTimeout(() => setHasAnimated(true), 1500);
  }, []);

  // Azioni
  const handleDelete = (id) => {
    if (window.confirm('Sei sicuro di voler eliminare questo prodotto?')) {
      setProducts(products.filter(product => product.id !== id));
    }
  };

  const handleEdit = (id) => {
    alert(`Modifica prodotto con ID: ${id}`);
  };

  const handleAddProduct = () => {
    alert('Aggiungi nuovo prodotto');
  };

  const handleLogout = () => {
    if (window.confirm('Sei sicuro di voler uscire?')) {
      localStorage.removeItem('token'); // opzionale
      alert('Logout effettuato');
      // redirect alla pagina di login
    }
  };

  // Paginazione
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const goToPage = (page) => setCurrentPage(page);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Messaggio di benvenuto */}
      {showWelcome && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-50 animate-slide-up">
          <h1 className="text-3xl font-light text-black tracking-wide">
            Benvenuto{username ? `, ${username}` : ''}!
          </h1>
        </div>
      )}

      {hasAnimated && (
        <>
          {/* Header */}
          <header className="border-b border-gray-200 px-6 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-light text-black tracking-wide">HellishStorm</h1>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-black transition-colors"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </header>

          {/* Main */}
          <main className="p-6">
            <div className="mb-8 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-light text-black mb-2">Magazzino</h2>
                <div className="w-16 h-px bg-black"></div>
              </div>
              <button
                onClick={handleAddProduct}
                className="flex items-center px-4 py-2 bg-black text-white hover:bg-gray-900 transition-colors font-light"
              >
                <Plus className="h-4 w-4 mr-2" />
                Inserisci Prodotto
              </button>
            </div>

            {/* Tabella prodotti */}
            <div className="bg-white border border-gray-200 rounded-none overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prodotto</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Magazzino</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prezzo</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Azioni</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4">
                          <div className="w-12 h-16 bg-gray-200 rounded-sm overflow-hidden flex items-center justify-center">
                            <span className="text-xs text-gray-600 font-light">IMG</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm font-light text-black">{product.nome}</td>
                        <td className="px-4 py-4">
                          <span className="inline-flex px-2 py-1 text-xs font-light rounded-full bg-green-100 text-green-800">
                            {product.magazzino}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm font-light text-black">{product.prezzo}</td>
                        <td className="px-4 py-4 text-sm font-light text-gray-600">{product.categoria}</td>
                        <td className="px-4 py-4 text-sm font-light text-gray-500">{product.data}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleEdit(product.id)}
                              className="text-gray-400 hover:text-blue-600 transition-colors"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="text-gray-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Paginazione */}
            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-gray-500 font-light">
                  Mostrando {startIndex + 1}-{Math.min(endIndex, products.length)} di {products.length} prodotti
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 text-gray-400 hover:text-black disabled:opacity-50"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => goToPage(i + 1)}
                      className={`px-3 py-1 text-sm font-light ${
                        currentPage === i + 1 ? 'bg-black text-white' : 'text-gray-600 hover:text-black'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 text-gray-400 hover:text-black disabled:opacity-50"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-400 font-light">
                {products.length} prodotti totali in magazzino
              </p>
            </div>
          </main>
        </>
      )}

      <style>{`
        @keyframes slideUp {
          0% { transform: translateY(0); opacity: 1; }
          80% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-100%); opacity: 0; }
        }

        .animate-slide-up {
          animation: slideUp 0.8s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}
