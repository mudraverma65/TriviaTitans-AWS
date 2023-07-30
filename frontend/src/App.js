import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateTeam from './CreateTeam';
import CreateTeamName from './CreateTeamName';
import InviteTeamMember from './InviteTeamMember';
import GameDetails from './Components/GameDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import LobbyPage from './Components/LobbyPage';
import TeamDetails from './Components/TeamDetails';


const App = () => {
  return (
    <div>
    <Router>
      <Routes>
        <Route exact path="/" element={<CreateTeam />} />
        <Route exact path="/lobby" element={<LobbyPage />} />
        <Route exact path="/team" element={<TeamDetails/>} />
        {/* <Route path="/profile" element={<ProfileP />} />
        <Route path="/profile/:id" element={<ProfileD />} /> */}
      </Routes>
    </Router>
    </div> 

  );
};

export default App;
