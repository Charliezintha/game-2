import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Game from './Game';
import './App.css';
import { AuthProvider } from './index1';

import Navbar from './Navbar';
import Menu from './Menu';
import Instruction from './Instruction';
import Levels from './Levels';
import Scoreboard from './Scoreboard';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
             
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/game" element={<Game />} />
            <Route path="/instruction" element={<Instruction />} />
            <Route path="/levels" element={<Levels />} />
            <Route path="/scoreboard" element={<Scoreboard />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;