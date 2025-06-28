import React, { useContext, useState } from 'react';
import './login.css';
import { loginCalls } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { dispatch } = useContext(AuthContext);

    const handleClick = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        dispatch({ type: 'LoginStart' });
        const userCredentials = { email, password };

        try {
            const response = await loginCalls(userCredentials);
            if (response && response.user) {
                localStorage.setItem('user', JSON.stringify(response.user));
                dispatch({ type: 'LoginSuccess', payload: response.user });
                navigate(`/profile/${response.user.username}`);
            } else {
                setError("Invalid email or password.");
                dispatch({ type: 'LoginFailure' });
            }
        } catch (err) {
            setError(err?.response?.data?.error || "Login failed. Please try again.");
            dispatch({ type: 'LoginFailure' });
        } finally {
            setLoading(false);
        }
    };

    const createNewAcc = () => {
        navigate("/register");
    };

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                  <div className="loginLeftContent">
                    <div className="logoContainer">
                      <h1 className="logo auth-logo">
                        <span className="logo-part quill">Quill</span>
                        <span className="logo-part connect">Connect</span>
                      </h1>
                    </div>
                    <p className="loginDesc">Connect with friends and the world around you on QuillConnect</p>
                  </div>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className='loginEmail' 
                            type='email' 
                            required 
                            placeholder='Enter Your Email' 
                            disabled={loading}
                        />
                        <input 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder='Enter Your Password' 
                            required 
                            minLength={6} 
                            type="password" 
                            className="loginPassword" 
                            disabled={loading}
                        />
                        {error && <div className="loginError">{error}</div>}
                        <button className="loginButton" type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Log In'}</button>
                        <a href="#" className='loginForgetPassword'>Forgot password?</a>
                        <button className="loginCreateNewAccount" onClick={createNewAcc} type="button" disabled={loading}>Create new account</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;