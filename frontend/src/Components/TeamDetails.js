import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const TeamDetails = ({ currentUser, team_Name }) => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [adminEmailID, setAdmin] = useState('');

  const[newAdmin, updateAdmin] = useState('');
  const[newMembers, updateMembers] = useState('');

  const loggedIn = 'admin@example.com';
  const teamName = 'Team_B';

  const realTeamName = teamName.replace("_", " ")

  useEffect(() => {
    // Fetch team details from the API endpoint
    const fetchTeamDetails = async () => {
      try {
        const response = await axios.get(`https://wlfhjj5a5a.execute-api.us-east-1.amazonaws.com/game/team-details?teamname=${teamName}`);
        const { data } = response;
        setTeamMembers(data.body.members);
        updateMembers(data.body.members);
        setAdmin(data.body.admin)
      } catch (error) {
        console.error(error);
      }
    };
    fetchTeamDetails();
  }, [teamName]);

  const handlePromoteAdmin = (emailID) => {
    // Check if the emailID is the admin emailID
    if (emailID === adminEmailID) {
      alert('You cannot promote the admin.');
      return;
    }
    updateAdmin(emailID);
  };

  console.log(newAdmin)

  const handleRemoveMember = (emailID) => {
    // Check if the emailID is the admin emailID
    if (emailID === adminEmailID) {
      alert('You cannot remove the admin.');
      return;
    }

    // Remove the member from the teamMembers state
    updateMembers((prevMembers) =>
      prevMembers.filter((member) => member!== emailID)
    );
  };

  console.log(newMembers)

  const handleLeaveTeam = () => {
    // Check if the logged-in user is the admin
    if (loggedIn === adminEmailID) {
      alert('Admin cannot leave the team.');
      return;
    }

    // Remove the logged-in user from the teamMembers state
    updateMembers((prevMembers) =>
      prevMembers.filter((member) => member!== loggedIn)
    );
  };

  const handleSaveDetails = async () => {
    try {
        // Construct the message body
        const messageBody = {
            teamname: realTeamName,
            admin: newAdmin,
            members: newMembers // Replace 'MyTeam' with the desired team name
        };
        // Make the POST request to the API with the message body
        const apiEndpoint = 'https://wlfhjj5a5a.execute-api.us-east-1.amazonaws.com/game/update-team'; // Replace with your actual API endpoint
        const response = await axios.post(apiEndpoint, messageBody);
        
        console.log('API response:', response.data);
      } catch (error) {
        console.error(error);
      } 
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Team Details: {realTeamName}</h2>
      {teamMembers.map((member) => (
        <div key={member} className="card mb-2">
          <div className="card-body d-flex justify-content-between align-items-center">
            <span>{member}</span>
            {adminEmailID === loggedIn && (
              <div>
                <button
                  className="btn btn-primary mr-2"
                  onClick={() => handlePromoteAdmin(member)}
                >
                  Promote to Admin
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemoveMember(member)}
                >
                  Remove Member
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
      <div className="text-center mt-4">
        <button className="btn btn-warning" onClick={handleLeaveTeam}>
        Leave Team
        </button> <></>
        <button className="btn btn-success ml-2" onClick={handleSaveDetails}>
            Save Details
          </button>
      </div>
    </div>
  );
};

export default TeamDetails;
