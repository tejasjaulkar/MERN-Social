import React, { useContext, useState } from 'react';
import './login.css';
import { loginCalls } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { dispatch } = useContext(AuthContext);

    const handleClick = async (e) => {
        e.preventDefault();
        const userCredentials = { email, password };

        try {
            const response = await loginCalls(userCredentials);
            if (response) {
                localStorage.setItem('user', JSON.stringify(response));
                dispatch({ type: 'LOGIN_SUCCESS', payload: response });
                navigate(`/profile/${response.username}`);
            } else {
                console.error("Response is null or undefined");
                navigate(`/notfound`);
            }
        } catch (err) {
            console.error(err);
            dispatch({ type: 'LOGIN_FAILURE', payload: err });
        }
    };

    const createNewAcc = () => {
        navigate("/register");
    };

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h1 className='logo'><b>QuillConnect</b></h1>
                    <p className='loginDesc'>Connect with friends and the world around you on QuillConnect</p>
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
                        />
                        <input 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder='Enter Your Password' 
                            required 
                            minLength={6} 
                            type="password" 
                            className="loginPassword" 
                        />
                        <button className="loginButton" type="submit">Log In</button>
                        <a href="#" className='loginForgetPassword'>Forgot password?</a>
                        <button className="loginCreateNewAccount" onClick={createNewAcc} type="button">Create new account</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;