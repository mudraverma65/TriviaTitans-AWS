import React, { useState} from 'react';
import '../Styles/styles.css'; // Import your custom styles.css or remove this line if not needed
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import CreateTeamName from '../Components/CreateTeamName';
import InviteTeamMember from '../Components/InviteTeamMember';

const CreateTeam = () => {

//   const [teamName, setTeamName] = useState('');
//   localStorage.setItem('currentUserEmail', 'mudraverma65@gmail.com');
  const currentUserEmail = localStorage.getItem('userEmail');

  return (
    <div className="container">
      <div className="card mt-5">
        <div className="card-body">
          <CreateTeamName/>
          <InviteTeamMember/>
        </div>
      </div>
    </div>
  );
};

export default CreateTeam;