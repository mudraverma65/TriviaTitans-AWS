import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/styles.css'; // Import your custom styles.css or remove this line if not needed
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faEnvelope, faEye } from '@fortawesome/free-solid-svg-icons';
import CreateTeamName from './CreateTeamName';
import InviteTeamMember from './InviteTeamMember';

const CreateTeam = () => {

  const [teamName, setTeamName] = useState('');
  localStorage.setItem('currentUserEmail', 'mudraverma65@gmail.com');

  // const handleSetTeamName = (name) => {
  //   setTeamName(name);
  // };

  return (
    <div className="container">
      <div className="card mt-5">
        <div className="card-body">
          {/* <CreateTeamName onSetTeamName={handleSetTeamName} /> */}
          <CreateTeamName/>
          <InviteTeamMember/>
          {/* <InviteTeamMember teamName={teamName} /> */}
        </div>
      </div>
    </div>
  );
};

export default CreateTeam;