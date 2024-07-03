import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './components/register';
import Login from './components/login';
import Dashboard from './components/dashboard';
import Limbo from './components/limbo';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/register">S'inscrire</Link></li>
            <li><Link to="/login">Se connecter</Link></li>
            <li><Link to="/dashboard">Tableau de bord</Link></li>
            <li><Link to="/games/limbo">Limbo</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/games/limbo" element={<Limbo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;