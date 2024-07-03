import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        login,
        password
      });
      
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      } else {
        setError('Réponse du serveur invalide');
      }
    } catch (error) {
      if (error.response) {
        // La requête a été faite et le serveur a répondu avec un code d'état
        // qui ne fait pas partie de la plage 2xx
        setError(error.response.data.error || 'Une erreur s\'est produite');
      } else if (error.request) {
        // La requête a été faite mais aucune réponse n'a été reçue
        setError('Aucune réponse reçue du serveur');
      } else {
        // Quelque chose s'est passé dans la configuration de la requête qui a déclenché une erreur
        setError('Erreur de configuration de la requête');
      }
      console.error('Erreur de connexion:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={login} 
          onChange={(e) => setLogin(e.target.value)} 
          placeholder="Email ou nom d'utilisateur" 
          required 
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Mot de passe" 
          required 
        />
        <button type="submit">Se connecter</button>
      </form>
      {error && <p style={{color: 'red'}}>{error}</p>}
    </div>
  );
}

export default Login;