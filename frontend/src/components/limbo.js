import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Limbo() {
  const [bet, setBet] = useState('');
  const [targetMultiplier, setTargetMultiplier] = useState('');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBalance();
    fetchHistory();
  }, []);

  const fetchBalance = async () => {
    setError('');
    try {
      const response = await axios.get('http://localhost:3000/user/balance', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.data && typeof response.data.balance === 'number') {
        setBalance(response.data.balance);
      } else {
        setError('Réponse inattendue du serveur pour le solde');
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Erreur lors de la récupération du solde');
      console.error('Erreur lors de la récupération du solde:', error);
    }
  };

  const fetchHistory = async () => {
    setError('');
    try {
      const response = await axios.get('http://localhost:3000/games/limbo/history', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if (Array.isArray(response.data)) {
        setHistory(response.data);
      } else {
        setError('Réponse inattendue du serveur pour l\'historique');
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Erreur lors de la récupération de l\'historique');
      console.error('Erreur lors de la récupération de l\'historique:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:3000/games/limbo/play', 
        { bet: Number(bet), targetMultiplier: Number(targetMultiplier) },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      if (response.data && typeof response.data.newBalance === 'number') {
        setResult(response.data);
        setBalance(response.data.newBalance);
        fetchHistory();
      } else {
        setError('Réponse inattendue du serveur pour le jeu');
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Erreur lors du jeu');
      console.error('Erreur lors du jeu:', error);
    }
  };

  return (
    <div>
      <h2>Limbo</h2>
      {error ? (
        <p style={{color: 'red'}}>{error}</p>
      ) : (
        <>
          <p>Votre solde actuel : {balance}</p>
          <form onSubmit={handleSubmit}>
            <input 
              type="number" 
              value={bet} 
              onChange={(e) => setBet(e.target.value)} 
              placeholder="Mise" 
              required 
            />
            <input 
              type="number" 
              value={targetMultiplier} 
              onChange={(e) => setTargetMultiplier(e.target.value)} 
              placeholder="Multiplicateur cible" 
              required 
            />
            <button type="submit">Jouer</button>
          </form>
          {result && (
            <div>
              <h3>Résultat de la dernière partie :</h3>
              <p>Résultat : {result.won ? 'Gagné' : 'Perdu'}</p>
              <p>Gain : {result.payout}</p>
              <p>Nouveau solde : {result.newBalance}</p>
            </div>
          )}
          <h3>Historique des parties</h3>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Mise</th>
                <th>Multiplicateur cible</th>
                <th>Multiplicateur du jeu</th>
                <th>Gain</th>
              </tr>
            </thead>
            <tbody>
              {history.map((game, index) => (
                <tr key={index}>
                  <td>{new Date(game.timestamp).toLocaleString()}</td>
                  <td>{game.bet}</td>
                  <td>{game.outcome.targetMultiplier}</td>
                  <td>{game.outcome.gameMultiplier}</td>
                  <td>{game.payout}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default Limbo;