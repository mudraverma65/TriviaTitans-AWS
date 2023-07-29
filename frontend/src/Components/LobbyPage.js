import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GameDetails from './GameDetails';

const LobbyPage = () => {
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [timeRemaining, setTimeRemaining] = useState('');
  const [filteredGames, setFilteredGames] = useState([]);

  const allGames = [
    { id: 1, title: 'Game 1', category: 'Sports', difficulty: 'Medium', timeRemaining: 3600, participants: 2, Description: 'This is Game 1' },
    { id: 2, title: 'Game 2', category: 'Computer Science', difficulty: 'Difficult', timeRemaining: 7200, participants: 3, Description: 'This is Game 2' },
    { id: 3, title: 'Game 3', category: 'Nature', difficulty: 'Easy', timeRemaining: 1800, participants: 2, Description: 'This is Game 3' },
    // Add more games here
  ];

  useEffect(() => {
    // Filter games based on the selected criteria
    let filteredGames = allGames;

    // if (category) {
    //   filteredGames = filteredGames.filter((game) => game.category === category);
    // }

    if (category) {
      axios
        .post('https://gceak8vzy1.execute-api.us-east-1.amazonaws.com/dev/filteredgames', {
          categoryName: category,
        })
        .then((response) => {
          console.log('POST request successful:', response.data);
          // Update the filteredGames state with the data received from the API
          setFilteredGames(response.data);
        })
        .catch((error) => {
          console.error('POST request failed:', error);
        });
    }

    if (difficulty) {
      filteredGames = filteredGames.filter((game) => game.difficulty === difficulty);
    }

    if (timeRemaining) {
      const timeRemainingInSeconds = timeRemaining === '30 minutes' ? 1800 : timeRemaining === '1 hour' ? 3600 : 7200;
      filteredGames = filteredGames.filter((game) => game.timeRemaining <= timeRemainingInSeconds);
    }

    setFilteredGames(filteredGames);
  }, [category, difficulty, timeRemaining]);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  const handleTimeRemainingChange = (event) => {
    setTimeRemaining(event.target.value);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col">
          <div className="form-group">
            <label>Category:</label>
            <select className="form-control" value={category} onChange={handleCategoryChange}>
              <option value="">Select a category</option>
              <option value="Sports">Sports</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Nature">Nature</option>
            </select>
          </div>
        </div>
        <div className="col">
          <div className="form-group">
            <label>Difficulty:</label>
            <select className="form-control" value={difficulty} onChange={handleDifficultyChange}>
              <option value="">Select a difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Difficult">Difficult</option>
            </select>
          </div>
        </div>
        <div className="col">
          <div className="form-group">
            <label>Time Remaining:</label>
            <select className="form-control" value={timeRemaining} onChange={handleTimeRemainingChange}>
              <option value="">Select time remaining</option>
              <option value="30 minutes">30 minutes</option>
              <option value="1 hour">1 hour</option>
              <option value="2 hours">2 hours</option>
            </select>
          </div>
        </div>
      </div>
      <GameDetails games={filteredGames} />
    </div>
  );
};

export default LobbyPage;
