import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBalance = async () => {
      setError('');
      try {
        const response = await axios.get('http://localhost:3000/user/balance', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        if (response.data && typeof response.data.balance === 'number') {
          setBalance(response.data.balance);
        } else {
          setError('Réponse inattendue du serveur');
        }
      } catch (error) {
        setError(error.response?.data?.error || 'Erreur lors de la récupération du solde');
        console.error('Erreur lors de la récupération du solde:', error);
      }
    };

    fetchBalance();
  }, []);

  return (
    <div>
      <h2>Tableau de bord</h2>
      {error ? (
        <p style={{color: 'red'}}>{error}</p>
      ) : (
        <p>Votre solde actuel : {balance}</p>
      )}
    </div>
  );
}

export default Dashboard;