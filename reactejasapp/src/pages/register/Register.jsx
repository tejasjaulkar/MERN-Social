import React, { useState } from 'react';
import './register.css';
import { RegisterCalls } from '../../apiCalls';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const userData = {
      username,
      email,
      password,
    };

    try {
      await RegisterCalls(userData);
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  const navigateToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h1 className="logo">QuillConnect</h1>
          <p className="registerDesc">Connect with friends and the world around you on QuillConnect</p>
        </div>
        <div className="registerRight">
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Username"
              type="text"
              required
              className="registerInput registerUsername"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="registerInput registerEmail"
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength={6}
              className="registerInput registerPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              placeholder="Confirm Password"
              type="password"
              required
              className="registerInput registerPasswordAgain"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="submit" className="registerButton">
              Sign Up
            </button>
          </form>
          <button className="registerLoginButton" onClick={navigateToLogin}>
            Log into account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;