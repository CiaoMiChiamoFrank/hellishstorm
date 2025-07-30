import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/homepage';
import Signup from './pages/signup';
import Login from './pages/login';
import Magazzino from './pages/magazzino';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/magazzino" element={<Magazzino />} />
      </Routes>
    </Router>
  );
}

export default App;
