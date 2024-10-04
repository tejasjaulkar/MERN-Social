import React from 'react';

// Import your pages
import Homepage from './pages/home/Homepage';
import Profile from './pages/Profile/Profile';
import Login from './pages/login/Login';
import Register from './pages/register/Register';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import { Person } from '@mui/icons-material'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="profile/:username" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
