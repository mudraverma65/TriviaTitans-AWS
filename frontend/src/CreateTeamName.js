import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateTeamName = () => {
  const [teamName, setTeamName] = useState('My Team');

  const handleCreateTeam = async () => {
    try {
      const response = await axios.get('https://wlfhjj5a5a.execute-api.us-east-1.amazonaws.com/game/team-name');
      const { data } = response;
      setTeamName(data.body);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="card-title text-center">Create a Team</h1>
      <button className="btn btn-primary btn-block" onClick={handleCreateTeam}>
        Create Team Name
      </button>
      <div className="mt-4">
        <h2 className="text-center">Team Name: {teamName}</h2>
      </div>
    </div>
  );
};

export default CreateTeamName;
