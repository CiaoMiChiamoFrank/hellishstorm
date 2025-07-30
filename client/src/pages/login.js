import React, { useState } from 'react';
import { Eye, EyeOff, Lock, User } from 'lucide-react';
import logoVideo from './video/logo.mp4';
import { useNavigate } from 'react-router-dom';


export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:5000/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: email, pwd: password })
      });

      const data = await res.json();

    if (data.bool === true && data.token) {
      console.log("Login OK");

      //Salva il token in localStorage
      localStorage.setItem('token', data.token);

      //Vai alla pagina protetta
      navigate('/magazzino');
    }  else {
        setError('Credenziali non valide');
      }

    } catch (err) {
      console.error("Errore durante il login:", err);
      setError('Errore di rete, riprova.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Video Placeholder */}
      <div className="h-0">
        <video autoPlay muted loop className="hidden">
          <source src={logoVideo} type="video/mp4" />
        </video>
      </div>

      {/* Login Form Section */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-light text-black tracking-wide md:tracking-widest mb-2">
              HelliShStorm — Area Amministrativa Privata
            </h1>
            <div className="w-24 h-px bg-black mx-auto"></div>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nome"
                className="w-full pl-12 pr-4 py-4 border border-gray-200 focus:border-black focus:outline-none transition-colors bg-white text-black placeholder-gray-400 font-light"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-12 pr-12 py-4 border border-gray-200 focus:border-black focus:outline-none transition-colors bg-white text-black placeholder-gray-400 font-light"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {/* Error */}
            {error && (
              <div className="text-red-600 text-sm text-center font-light">{error}</div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white py-4 font-light tracking-wide hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  ACCESSO...
                </div>
              ) : (
                'ACCEDI'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-400 font-light tracking-wide">
              Accesso riservato agli amministratori
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
