import { useState } from 'react';
import './css/signup.css'; // CSS associato

function Signup() {
  const [nome, setNome] = useState('');
  const [pwd, setPwd] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/admin/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, pwd }),
      });

      const data = await res.json();
      setMessage(data.message + ' ✅');
    } catch (error) {
      console.error('Errore:', error);
      setMessage('Errore durante il signup ❌');
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Registrazione Admin</h2>
        <input
          type="text"
          placeholder="Nome admin"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          required
        />
        <button type="submit">Crea account</button>
        <p className="signup-message">{message}</p>
      </form>
    </div>
  );
}

export default Signup;
