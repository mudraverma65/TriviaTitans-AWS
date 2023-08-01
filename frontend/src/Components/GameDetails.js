import React, { useState, useEffect } from 'react';
import '../Styles/styles.css';

const GameDetails = ({ games }) => {
  // Define state variables to hold event details
  // const [eventName, setEventName] = useState('');
  // const [participantsCount, setParticipantsCount] = useState(0);
  // const [timeRemaining, setTimeRemaining] = useState(0);
  // const [eventDescription, setEventDescription] = useState('');

  const calculateTimeRemaining = (startTime) => {
    const currentTime = new Date();
    const gameStartTime = new Date(startTime);
    const timeDifference = gameStartTime.getTime() - currentTime.getTime();
    const timeRemainingInSeconds = Math.max(0, Math.floor(timeDifference / 1000));
    return timeRemainingInSeconds;
  };

  // Format the time remaining in a human-readable format
  const formatTimeRemaining = (timeRemaining) => {
    if (timeRemaining >= 86400) {
      // Display in days
      const days = Math.floor(timeRemaining / 86400);
      return `${days} ${days === 1 ? 'day' : 'days'}`;
    } else if (timeRemaining >= 3600) {
      // Display in hours
      const hours = Math.floor(timeRemaining / 3600);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
    } else if (timeRemaining >= 60) {
      // Display in minutes
      const minutes = Math.floor(timeRemaining / 60);
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
    } else {
      // Display in seconds
      return `${timeRemaining} ${timeRemaining === 1 ? 'second' : 'seconds'}`;
    }
  };

  return (
    <div>
      {games.map((game) => (
        <div key={game.gameID} className="event-details-container">
          <div className="row">
            <div className="col-sm-4">
              <p className="game-info">
                <span className="game-info-label">Category:</span> {game.categoryName}
              </p>
            </div>
            <div className="col-sm-4">
              <p className="game-info">
                <span className="game-info-label">Duration:</span> {game.duration}
              </p>
            </div>
            <div className="col-sm-4">
              <p className="game-info">
                <span className="game-info-label">Difficulty:</span> {game.difficulty}
              </p>
            </div>
          </div>
          <h3 className="event-name">{game.title}</h3>
          <div className="row">
            <div className="col-sm-6">
              <p className="participants">Participants: {game.participants}</p>
            </div>
            <div className="col-sm-6">
              <p className="time-remaining">Time Remaining: {formatTimeRemaining(calculateTimeRemaining(game.startTime))}</p>
            </div>
          </div>
          {/* <p className="description">{game.Description}</p> */}
          <div className="col text-center">
            <button className="btn btn-primary btn-join">Join</button>
          </div>
        </div>
      ))}
    </div>
  );
    
};

export default GameDetails;
