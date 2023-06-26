import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateTeam from './CreateTeam';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<CreateTeam />} />
        {/* <Route path="/profile" element={<ProfileP />} />
        <Route path="/profile/:id" element={<ProfileD />} /> */}
      </Routes>
    </Router>

  );
};

export default App;
