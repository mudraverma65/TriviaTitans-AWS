import React, { useState, useEffect } from 'react';
import '../Styles/styles.css';

const GameDetails = ({ games }) => {
  // Define state variables to hold event details
  const [eventName, setEventName] = useState('');
  const [participantsCount, setParticipantsCount] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [eventDescription, setEventDescription] = useState('');

  // useEffect(() => {
  //   // Fetch event details when the component mounts
  //   // Replace this with your actual API call to fetch event details
  //   // For demonstration purposes, we will set dummy data here.
  //   const fetchEventDetails = () => {
  //     const eventData = {
  //       name: 'Sample Event',
  //       participants: 25,
  //       timeRemaining: 3600, // Time remaining in seconds
  //       description: 'This is a sample event description.',
  //     };

  //     setEventName(eventData.name);
  //     setParticipantsCount(eventData.participants);
  //     setTimeRemaining(eventData.timeRemaining);
  //     setEventDescription(eventData.description);
  //   };

  //   fetchEventDetails();
  // }, []);

  // Format the time remaining in a human-readable format
  const formatTimeRemaining = (timeRemaining) => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    return `${minutes}m ${seconds}s`;
  };

  return (
    <div>
      {games.map((game) => (
        <div key={game.id} className="event-details-container">
          <h2 className="event-name">{game.title}</h2>
          <div className="row">
            <div className="col-sm-6">
              <p className="participants">Participants: {game.participants}</p>
            </div>
            <div className="col-sm-6">
              <p className="time-remaining">Time Remaining: {formatTimeRemaining(game.timeRemaining)}</p>
            </div>
          </div>
          <p className="description">{game.Description}</p>
          <div className="col text-center">
            <button className="btn btn-primary btn-join">Join</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GameDetails;
