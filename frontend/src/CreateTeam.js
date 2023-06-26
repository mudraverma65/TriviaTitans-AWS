import React, { useState } from 'react';
import axios from 'axios';
import './styles.css'; // Import your custom styles.css or remove this line if not needed
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faEnvelope, faEye } from '@fortawesome/free-solid-svg-icons';

const CreateTeam = () => {
  const [teamName, setTeamName] = useState('My Team');
  const [selectedUser, setSelectedUser] = useState('');
  const [invitationSent, setInvitationSent] = useState(false);
  const [invitedUsers, setInvitedUsers] = useState([]);
  const [alreadyInvited, setAlreadyInvited] = useState(false);

  const handleCreateTeam = () => {
    // Logic to create team name
    setTeamName('My Created Team');
  };

  const handleUserSelection = (event) => {
    const selectedUserId = event.target.value;
    setSelectedUser(selectedUserId);
    setInvitationSent(false); // Enable the option to send invitations again when a new user is selected
    setAlreadyInvited(false); // Reset the alreadyInvited state when a new user is selected
  };

  const handleSendInvitation = async () => {
    try {
      if (invitedUsers.includes(selectedUser)) {
        setAlreadyInvited(true); // Set the alreadyInvited state to true if the user is already invited
        return;
      }

      console.log('Sending invitation to:', selectedUser);
      setInvitationSent(true);
      setInvitedUsers((prevInvitedUsers) => [...prevInvitedUsers, selectedUser]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="card mt-5">
        <div className="card-body">
          <h1 className="card-title text-center">Create a Team</h1>
          <button className="btn btn-primary btn-block" onClick={handleCreateTeam}>
            Create Team Name
          </button>
          {teamName && (
            <div className="mt-4">
              <h2 className="text-center">Team Name: {teamName}</h2>
              <div className="form-group">
                <label htmlFor="userDropdown">
                  <FontAwesomeIcon icon={faUsers} className="mr-2" />
                  Select User to Invite:
                </label>
                <select id="userDropdown" className="form-control" onChange={handleUserSelection}>
                  <option value="">Select User</option>
                  <option value="user1">User 1</option>
                  <option value="user2">User 2</option>
                  <option value="user3">User 3</option>
                  {/* Add more options for other users */}
                </select>
              </div>
              {alreadyInvited && (
                <div className="alert alert-warning" role="alert">
                  User is already invited.
                </div>
              )}
              <button
                className="btn btn-success btn-block"
                onClick={handleSendInvitation}
                disabled={invitationSent || selectedUser === ''}
              >
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                {invitationSent ? 'Invitation Sent!' : 'Send Invitation'}
              </button>
              {invitedUsers.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-center">Invited Users:</h3>
                  <ul>
                    {invitedUsers.map((user) => (
                      <li key={user}>{user}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateTeam;
