import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Game.css';
import { db, setDoc, doc, updateDoc, getDoc } from './firebase';
import { auth } from './firebase'; // Import Firebase Auth

function Game() {
  const navigate = useNavigate();
  const location = useLocation();
  const { level } = location.state || { level: 1 }; // Default to level 1 if no level is passed

  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15); // Default time
  const [gameOver, setGameOver] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0); // Track correct answers

  const levelTimeLimits = {
    1: 180,
    2: 150,
    3: 100,
    4: 80,
    5: 50,
    6: 30,
  };

  // Fetch game data from API
  const fetchGameData = async () => {
    const apiUrl = 'https://marcconrad.com/uob/banana/api.php?out=csv&base64=yes';
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('Failed to fetch game data');
      const dataRaw = await response.text();
      const [imageData, solution] = dataRaw.split(',');
      return {
        image: `data:image/png;base64,${imageData}`,
        solution: parseInt(solution, 10),
      };
    } catch (error) {
      console.error('Error fetching game data:', error);
      return null;
    }
  };

  // Save the score to Firestore
  const saveScoreToFirestore = async () => {
    const user = auth.currentUser;
    if (!user) {
      console.error('No user is logged in');
      return;
    }
    const userId = user.uid;
    const scoreDocRef = doc(db, 'scores', userId);

    try {
      const scoreDocSnap = await getDoc(scoreDocRef);
      if (scoreDocSnap.exists()) {
        await updateDoc(scoreDocRef, {
          [`level${level}`]: correctAnswers,
        });
      } else {
        await setDoc(scoreDocRef, {
          [`level${level}`]: correctAnswers,
        });
      }
    } catch (error) {
      console.error('Error saving score to Firestore:', error);
    }
  };

  // Load new game
  const loadNewGame = async () => {
    setLoading(true);
    setFeedback(null);
    setGuess('');
    setGameOver(false);

    const data = await fetchGameData();
    if (data) {
      setGameData(data);
    } else {
      setError('Failed to load game data');
    }
    setLoading(false);
  };

  // Set timer for level
  useEffect(() => {
    setTimeLeft(levelTimeLimits[level] || 15);
    loadNewGame();
  }, [level]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) {
      setGameOver(true);
      setFeedback(`Time's up! You got ${correctAnswers} correct answers.`);
      saveScoreToFirestore();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Handle user guess
  const handleGuess = () => {
    if (parseInt(guess, 10) === gameData.solution) {
      setFeedback('Correct! Loading a new game...');
      setCorrectAnswers((prevCount) => prevCount + 1);
      setTimeout(loadNewGame, 1000);
    } else {
      setFeedback('Incorrect. Try again!');
    }
  };

  // Restart the current level
  const handlePlayAgain = () => {
    setCorrectAnswers(0);
    setTimeLeft(levelTimeLimits[level] || 15);
    setGameOver(false);
    loadNewGame();
  };

  // Navigate to levels page
  const handleHome = () => navigate('/levels');

  // Navigate to next level
  const handleNextLevel = () => {
    if (level < 6) {
      navigate('/game', { state: { level: level + 1 } });
    } else {
      alert('You have completed all levels!');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Guess the Answer Game</h1>
      <p>Time Left: {timeLeft} seconds</p>
      <p>Correct Answers: {correctAnswers}</p>

      {gameOver ? (
        <div className="dialog">
          <h2>Game Over!</h2>
          <p>You got {correctAnswers} correct answers.</p>
          <div className="dialog-buttons">
            <button onClick={handlePlayAgain}>Play Again</button>
            <button onClick={handleHome}>Home</button>
            <button onClick={handleNextLevel}>Next Level</button>
          </div>
        </div>
      ) : (
        <>
          {gameData && (
            <>
              <img src={gameData.image} alt="Game" style={{ width: 'auto', height: 'auto' }} />
              <div>
                <input
                  type="number"
                  placeholder="Enter your guess"
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  disabled={gameOver}
                />
                <button onClick={handleGuess} disabled={gameOver}>
                  Submit Guess
                </button>
              </div>
              {feedback && <p>{feedback}</p>}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Game;
