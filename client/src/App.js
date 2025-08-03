import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/homepage';
import Signup from './pages/signup';
import Login from './pages/login';
import Magazzino from './pages/magazzino';
import Catalogo from './pages/catalogo';
import Contatti from './pages/contatti';
import Prodotto from './pages/prodotto';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/magazzino" element={<Magazzino />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/contatti" element={<Contatti />} />
        <Route path="/prodotto/:id" element={<Prodotto />} />
      </Routes>
    </Router>
  );
}

export default App;
