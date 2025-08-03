import React, { useEffect, useState } from 'react';
import { LogOut, Trash2, Edit3, Plus, ChevronLeft, ChevronRight, X, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function WarehousePage() {
  const [username, setUsername] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState({ visible: false, message: '', type: 'info', onConfirm: null });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const [authStatus, setAuthStatus] = useState('loading');
  const token = localStorage.getItem('token');

  const [newProduct, setNewProduct] = useState({
    titolo: '',
    descrizione: '',
    categorie: [],
    prezzo: '',
    magazzino: true,
    foto: []
  });

  const [products, setProducts] = useState([]);
  const categorieDisponibili = ['New Drop', 'T-Shirt', 'Felpe', 'Jeans', 'Accessori'];

  const showCustomMessage = (message, type = 'info', onConfirm = null) => {
    setShowMessageModal({ visible: true, message, type, onConfirm });
  };
  const closeCustomMessage = () => {
    setShowMessageModal({ visible: false, message: '', type: 'info', onConfirm: null });
  };

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:5000/admin/magazzino/visualizza', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      const data = await res.json();

      if (res.ok && data.bool) {
        const productsWithId = data.prodotti.map((p, index) => ({
          ...p,
          id: p._id || `product-${index}`
        }));
        setProducts(productsWithId);
      } else {
        showCustomMessage(data.message || 'Errore durante la visualizzazione dei prodotti.', 'error');
        setProducts([]);
      }
    } catch (err) {
      console.error('Errore durante il recupero dei prodotti:', err);
      showCustomMessage('Errore server. Impossibile caricare i prodotti.', 'error');
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.role === 'admin') {
          setAuthStatus('authenticated');
          setUsername(payload.nome);
          setTimeout(() => setShowWelcome(false), 3000);
          setTimeout(() => setHasAnimated(true), 1500);
          fetchProducts();
        } else {
          setAuthStatus('unauthenticated');
        }
      } catch (err) {
        setAuthStatus('unauthenticated');
      }
    } else {
      setAuthStatus('unauthenticated');
    }
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCategoriaToggle = (categoria) => {
    setNewProduct(prev => ({
      ...prev,
      categorie: prev.categorie.includes(categoria)
        ? prev.categorie.filter(c => c !== categoria)
        : [...prev.categorie, categoria]
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      showCustomMessage('Puoi caricare un massimo di 5 immagini.', 'warning');
      e.target.value = null;
      setNewProduct(prev => ({
        ...prev,
        foto: []
      }));
    } else {
      setNewProduct(prev => ({
        ...prev,
        foto: files
      }));
    }
  };

  const resetForm = () => {
    setNewProduct({
      titolo: '',
      descrizione: '',
      categorie: [],
      prezzo: '',
      magazzino: true,
      foto: []
    });
  };

  const handleSubmitProduct = async () => {
    try {
      const formData = new FormData();
      formData.append('titolo', newProduct.titolo);
      formData.append('descrizione', newProduct.descrizione);
      newProduct.categorie.forEach((cat) => formData.append('categorie', cat));
      formData.append('prezzo', newProduct.prezzo);
      formData.append('magazzino', newProduct.magazzino);
      
      newProduct.foto.forEach((file) => {
        formData.append('foto', file);
      });

      const res = await fetch('http://localhost:5000/admin/magazzino', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      const data = await res.json();

      if (data.bool === true) {
        showCustomMessage('Prodotto inserito con successo!', 'success');
        setShowAddModal(false);
        resetForm();
        fetchProducts();
      } else {
        showCustomMessage(data.message || 'Attenzione, errore durante l\'inserimento!', 'error');
      }
    } catch (err) {
      console.error("Errore durante inserimento prodotto:", err);
      showCustomMessage('Errore server. Impossibile inserire il prodotto.', 'error');
    }
  };

  const handleDelete = (id) => {
    const confirmDelete = () => {
      console.log(`Eliminazione prodotto con ID: ${id}`);
      showCustomMessage('Prodotto eliminato con successo!', 'success');
    };
    showCustomMessage('Sei sicuro di voler eliminare questo prodotto?', 'confirm', confirmDelete);
  };

  const handleEdit = (id) => {
    showCustomMessage(`Funzionalità di modifica per il prodotto ID: ${id} non ancora implementata.`, 'info');
  };

  const handleAddProduct = () => {
    setShowAddModal(true);
  };

  const handleLogout = () => {
    const confirmLogout = () => {
      localStorage.removeItem('token'); 
      navigate('/login');
    };
    showCustomMessage('Sei sicuro di voler uscire?', 'confirm', confirmLogout);
  };

  // Paginazione
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const goToPage = (page) => setCurrentPage(page);

  if (authStatus === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 font-inter text-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full">
          <h1 className="text-3xl font-light text-black mb-4">Caricamento...</h1>
          <div className="flex justify-center items-center">
             <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        </div>
      </div>
    );
  }

  if (authStatus === 'unauthenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 font-inter text-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full">
          <h1 className="text-3xl font-light text-red-600 mb-4">Accesso Negato</h1>
          <p className="text-gray-600 mb-6">
            Non hai i permessi per visualizzare questa pagina.
            <br />
            Accedi con un account amministratore per continuare.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors font-light"
          >
            Torna alla Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden font-inter">
      {showWelcome && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-50 animate-slide-up">
          <h1 className="text-3xl font-light text-black tracking-wide">
            Benvenuto{username ? `, ${username}` : ''}!
          </h1>
        </div>
      )}

      {hasAnimated && (
        <>
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

          <main className="p-6">
            {/* Sezione titolo e pulsante: usa flex-col su mobile, flex-row su schermi più grandi */}
            <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <div>
                <h2 className="text-xl font-light text-black mb-2">Magazzino</h2>
                <div className="w-16 h-px bg-black"></div>
              </div>
              <button
                onClick={handleAddProduct}
                className="flex items-center justify-center sm:justify-start mt-4 sm:mt-0 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-900 transition-colors font-light w-full sm:w-auto"
              >
                <Plus className="h-4 w-4 mr-2" />
                Inserisci Prodotto
              </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
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
                    {isLoading ? (
                      <tr>
                        <td colSpan="7" className="text-center py-8 text-gray-500 font-light">Caricamento prodotti...</td>
                      </tr>
                    ) : (
                      currentProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-4">
                            <div className="w-12 h-16 bg-gray-200 rounded-sm overflow-hidden flex items-center justify-center">
                              {product.immagini && product.immagini.length > 0 ? (
                                <img src={product.immagini[0]} alt={product.titolo} className="w-full h-full object-cover" />
                              ) : (
                                <span className="text-xs text-gray-600 font-light">IMG</span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm font-light text-black">{product.titolo}</td>
                          <td className="px-4 py-4">
                            <span className={`inline-flex px-2 py-1 text-xs font-light rounded-full ${
                              product.magazzino ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {product.magazzino ? 'Disponibile' : 'Non disponibile'}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-sm font-light text-black">{product.prezzo}€</td>
                          <td className="px-4 py-4 text-sm font-light text-gray-600">{product.catalogo?.join(', ') || 'Nessuna categoria'}</td>
                          <td className="px-4 py-4 text-sm font-light text-gray-500">
                            {product.data ? new Date(product.data).toLocaleDateString() : 'N/A'}
                          </td>
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
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {products.length > productsPerPage && (
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
                      className={`px-3 py-1 text-sm font-light rounded-md ${
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
          </main>
        </>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-gray-200 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-light text-black">Inserisci Prodotto</h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  resetForm();
                }}
                className="text-gray-400 hover:text-black transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-light text-black mb-2">
                  Nome Prodotto *
                </label>
                <input
                  type="text"
                  name="titolo"
                  value={newProduct.titolo}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-black transition-colors font-light"
                  placeholder="Inserisci nome prodotto"
                />
              </div>

              <div>
                <label className="block text-sm font-light text-black mb-2">
                  Descrizione
                </label>
                <textarea
                  name="descrizione"
                  value={newProduct.descrizione}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-black transition-colors font-light resize-none"
                  placeholder="Descrizione del prodotto"
                />
              </div>

              <div>
                <label className="block text-sm font-light text-black mb-2">
                  Categoria *
                </label>
                <div className="space-y-2">
                  {categorieDisponibili.map((categoria) => (
                    <label key={categoria} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={newProduct.categorie.includes(categoria)}
                        onChange={() => handleCategoriaToggle(categoria)}
                        className="mr-2 h-4 w-4 text-black bg-gray-100 border-gray-300 rounded focus:ring-black"
                      />
                      <span className="text-sm font-light text-gray-700">{categoria}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-light text-black mb-2">
                  Prezzo * (€)
                </label>
                <input
                  type="number"
                  name="prezzo"
                  value={newProduct.prezzo}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-black transition-colors font-light"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-light text-black mb-2">
                  Disponibilità Magazzino
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="magazzino"
                    checked={newProduct.magazzino}
                    onChange={handleInputChange}
                    className="mr-2 h-4 w-4 text-black bg-gray-100 border-gray-300 rounded focus:ring-black"
                  />
                  <span className="text-sm font-light text-gray-700">
                    Prodotto disponibile in magazzino
                  </span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-light text-black mb-2">
                  Foto Prodotto (max 5)
                </label>
                <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    multiple
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm font-light text-gray-600">
                      {newProduct.foto.length > 0 ? `${newProduct.foto.length} file selezionati` : 'Clicca per caricare le foto'}
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  resetForm();
                }}
                className="px-4 py-2 text-gray-600 hover:text-black transition-colors font-light"
              >
                Annulla
              </button>
              <button
                onClick={handleSubmitProduct}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-900 transition-colors font-light"
              >
                Salva Prodotto
              </button>
            </div>
          </div>
        </div>
      )}

      {showMessageModal.visible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-gray-200 rounded-lg max-w-sm w-full shadow-xl">
            <div className="p-6">
              <h3 className="text-lg font-light text-black mb-4">Messaggio</h3>
              <p className="text-sm font-light text-gray-700 mb-6">{showMessageModal.message}</p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={closeCustomMessage}
                  className="px-4 py-2 text-gray-600 hover:text-black transition-colors font-light"
                >
                  {showMessageModal.type === 'confirm' ? 'Annulla' : 'OK'}
                </button>
                {showMessageModal.type === 'confirm' && (
                  <button
                    onClick={() => {
                      if (showMessageModal.onConfirm) {
                        showMessageModal.onConfirm();
                      }
                      closeCustomMessage();
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-light"
                  >
                    Conferma
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        html, body, #root {
          height: 100%;
        }
        .font-inter {
          font-family: 'Inter', sans-serif;
        }
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
