import React, { useState } from 'react';
import './register.css';
import { RegisterCalls } from '../../apiCalls';
import { useNavigate } from 'react-router-dom';
import { 
  Person, 
  Email, 
  Lock, 
  Visibility, 
  VisibilityOff, 
  ArrowForward,
  CheckCircle,
  Error
} from '@mui/icons-material';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!username.trim()) {
      setError('Username is required');
      return;
    }
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    setLoading(true);

    const userData = {
      username: username.trim(),
      email: email.trim(),
      password,
      confirmpassword: confirmPassword,
    };

    try {
      const res = await RegisterCalls(userData);
      console.log("User Data being sent:", userData);
      setSuccess('Registration successful! Redirecting to login...');
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error('Registration failed:', error);
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const navigateToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <div className="registerLeftContent">
            <div className="logoContainer">
              <h1 className="logo auth-logo">
                <span className="logo-part quill">Quill</span>
                <span className="logo-part connect">Connect</span>
              </h1>
            </div>
            <p className="registerDesc">
              Connect with friends and the world around you on QuillConnect. 
              Share your thoughts, discover new connections, and stay updated with what matters to you.
            </p>
            <div className="features">
              <div className="feature">
                <CheckCircle className="featureIcon" />
                <span>Connect with friends and family</span>
              </div>
              <div className="feature">
                <CheckCircle className="featureIcon" />
                <span>Share your moments and thoughts</span>
              </div>
              <div className="feature">
                <CheckCircle className="featureIcon" />
                <span>Discover new communities</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="registerRight">
          <div className="registerFormContainer">
            <h2 className="registerTitle">Create Account</h2>
            <p className="registerSubtitle">Join QuillConnect today</p>
            
            {error && (
              <div className="errorMessage">
                <Error className="errorIcon" />
                <span>{error}</span>
              </div>
            )}
            
            {success && (
              <div className="successMessage">
                <CheckCircle className="successIcon" />
                <span>{success}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="registerForm">
              <div className="inputGroup">
                <div className="inputWrapper">
                  <Person className="inputIcon" />
                  <input
                    placeholder="Username"
                    type="text"
                    required
                    className="registerInput"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="inputGroup">
                <div className="inputWrapper">
                  <Email className="inputIcon" />
                  <input
                    className="registerInput"
                    type="email"
                    required
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="inputGroup">
                <div className="inputWrapper">
                  <Lock className="inputIcon" />
                  <input
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={6}
                    className="registerInput"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="passwordToggle"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </button>
                </div>
              </div>

              <div className="inputGroup">
                <div className="inputWrapper">
                  <Lock className="inputIcon" />
                  <input
                    placeholder="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    className="registerInput"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="passwordToggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={loading}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                className={`registerButton ${loading ? 'loading' : ''}`}
                disabled={loading}
              >
                {loading ? (
                  <div className="loadingSpinner"></div>
                ) : (
                  <>
                    Sign Up
                    <ArrowForward className="buttonIcon" />
                  </>
                )}
              </button>
            </form>

            <div className="registerDivider">
              <span>or</span>
            </div>

            <button 
              className="registerLoginButton" 
              onClick={navigateToLogin}
              disabled={loading}
            >
              Already have an account? Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;