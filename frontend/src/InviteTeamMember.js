import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const InviteTeamMember = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [userSelected, setUserSelected] = useState(false);
  const [usersInvited, setUsersInvited] = useState(false);
  const [usersSelected, setUsersSelected] = useState([]);
  const [alreadySelected, setAlreadySelected] = useState(false);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://xxxaxztrth.execute-api.us-east-1.amazonaws.com/Dev/users');
      const { body } = response.data;
      const users = JSON.parse(body);
      setUsers(users);
      console.log(users)
    } catch (error) {
      console.error(error);
    }
  };

  const handleInviteUsers = async () => {
    try {
      if (usersSelected.length === 0) {
        return;
      }

      console.log('Sending invitations to:', usersSelected);
      setUsersInvited(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateTeam = async () => {
    try {
      if (usersSelected.length === 0) {
        return;
      }

      console.log('Creating team with invited users:', usersSelected);
      console.log(userSelected)
      // Implement your logic to create a team with invited users
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserSelection = (event) => {
    const selectedUserInput = event.target.value;
    setSelectedUser(selectedUserInput);
    setUserSelected(false);
    setAlreadySelected(false);
    setUsersInvited(false);

    // Check if the selected user input matches any existing user's name or email
    const matchedUser = users.find(
      (user) =>
        user.name.toLowerCase() === selectedUserInput.toLowerCase() ||
        user.email.toLowerCase() === selectedUserInput.toLowerCase()
    );

    // If a match is found, automatically select the matched user
    if (matchedUser) {
      setSelectedUser(matchedUser.email);
    }
  };

  const handleSelectUser = () => {
    if (!selectedUser) {
      return;
    }

    if (usersSelected.includes(selectedUser)) {
      setAlreadySelected(true);
      return;
    }

    setUsersSelected((prevUsersSelected) => [...prevUsersSelected, selectedUser]);
  };

  return (
    <div className="mt-4">
      <div className="form-group">
        <label htmlFor="userDropdown">
          <FontAwesomeIcon icon={faUsers} className="mr-2" />
          Select User to Invite:
        </label>
        <select
          className="form-control"
          value={selectedUser}
          onChange={handleUserSelection}
        >
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user.email} value={user.email}>
              {user.name} - {user.email}
            </option>
          ))}
        </select>
      </div>
      {alreadySelected && (
        <div className="alert alert-warning" role="alert">
          User is already selected.
        </div>
      )}
      <button
        className="btn btn-dark btn-block"
        onClick={handleSelectUser}
        disabled={userSelected || selectedUser === ''}
      >
        {userSelected ? 'User Selected!' : 'Select User'}
      </button>
      {usersSelected.length > 0 && (
        <div className="mt-4">
          <h3 className="text-center">Selected Users:</h3>
          <ul>
            {usersSelected.map((user) => (
              <li key={user}>{user}</li>
            ))}
          </ul>
        </div>
      )}
      <button className="btn btn-success btn-block" onClick={handleInviteUsers}>
        <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
        {usersInvited ? 'User Invited!' : 'Invite Users'}
      </button>
    </div>
  );
};

export default InviteTeamMember;
