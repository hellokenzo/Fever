import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Limbo.css'; // Assurez-vous de créer ce fichier CSS pour le styling

function Limbo() {
  const [betAmount, setBetAmount] = useState('0.00000000');
  const [profit, setResult] = useState('0.00000000');
  const [multiplier, setMultiplier] = useState('2.00');
  const [gameResult, setHistory] = useState(null);
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBalance();
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

  const handleBet = async (e) => {
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
    }  };

  const calculateChance = () => {
    return (1 / parseFloat(multiplier) * 100).toFixed(8);
  };

  return (
    <div className="limbo-container">
      <div className="limbo-controls">
        <div className="bet-type">
          <button className="active">Manual</button>
          <button>Auto</button>
        </div>
        
        <div className="bet-amount">
          <label>Bet Amount</label>
          <div className="input-group">
            <input 
              type="number" 
              value={betAmount} 
              onChange={(e) => setBetAmount(e.target.value)}
            />
            <button onClick={() => setBetAmount((prev) => (parseFloat(prev) / 2).toFixed(8))}>½</button>
            <button onClick={() => setBetAmount((prev) => (parseFloat(prev) * 2).toFixed(8))}>2x</button>
          </div>
        </div>

        <div className="profit">
          <label>Profit</label>
          <input type="text" value={profit} readOnly />
        </div>

        <button className="bet-button" onClick={handleBet}>Bet</button>
      </div>

      <div className="game-result">
        {gameResult && <div className="multiplier">{gameResult.multiplier}x</div>}
      </div>

      <div className="game-settings">
        <div className="multiplier-setting">
          <label>Multiplier</label>
          <input 
            type="number" 
            value={multiplier} 
            onChange={(e) => setMultiplier(e.target.value)}
          />
        </div>
        <div className="chance">
          <label>Chance</label>
          <div>{calculateChance()}%</div>
        </div>
      </div>

      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default Limbo;