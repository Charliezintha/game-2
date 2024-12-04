import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Menu.css';

const Menu = () => {
  const navigate = useNavigate(); 

  return (
    <div className="container">
     
      
      <div className="button settings" onClick={() => navigate('/instruction')}>
        <div className="button-background"></div>
        <div className="button-text">Instructions</div>
      </div>
      <div className="button exit" onClick={() => navigate('/scoreboard')}>
        <div className="button-background"></div>
        <div className="button-text">Score Board</div>
      </div>
      <div className="button levels" onClick={() => navigate('/levels')}>
        <div className="button-background"></div>
        <div className="button-text">Play</div>
      </div>
    </div>
  );
};

export default Menu;