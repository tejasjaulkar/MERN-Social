import React , {useState}from 'react'
import './register.css'
import axios from 'axios'
import { RegisterCalls } from '../../apiCalls'
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const [username , setUsername] = useState('');
  const [email,setEmail] = useState('');
  const[password,setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()

  const handleClick =async (e) =>
  {
      e.preventDefault();
      console.log("click in reg");


      if (password !== confirmpassword) {
        return alert('Passwords do not match!');
      }

      
      const userData = {
        username,
        email,
        password,
        confirmpassword
      };
      RegisterCalls(userData)
      console.log("in reg",userData)
  }
  const fun1 = async() =>
  {
    console.log("fffkf")
    navigate("/login")
  }

  return (
    <div>

<div className="register">
                <div className="registerWrapper">
                    <div className="registerLeft">
                        <span className='logo'><b>TejasSocial</b></span>
                        <span className  ='registerDesc'>Connect with friends and the world <br /> around you on TejasSocial</span>
                    </div>
                    <div className="registerRight">
                      <form action="" onClick={handleClick}>
                      <input
                       placeholder='username'
                       type='text' 
                       required 
                       className="registerUsername" 
                       value={username} 
                       onChange={(e)=>setUsername(e.target.value)} 
                       />
                        <input 
                        className='registerEmail' 
                        type='email' 
                        required 
                        placeholder='Email' 
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        />
                        <input 
                        placeholder='Password' 
                        type='password' 
                        required 
                        minLength={6} 
                        className="registerPassword" 
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        />
                        <input
                         placeholder='password again'
                          type='password'
                          className="registerPasswordAgain" 
                          value={confirmpassword}
                          onChange={(e)=>setConfirmPassword(e.target.value)}
                        />
                        <button 
                        className="registerButton">
                          Sign Up
                          </button>
                        <button
                        className="registerCreateNewAccout" 
                        onClick={fun1}
                        >Log into account
                        </button>

                      </form>
                    </div>
                </div>
            </div>
           
      
      
    </div>
  )
}

export default Register
