
import React, { useContext , useState } from 'react'
import './login.css'
import { useRef } from 'react'
import { loginCalls } from '../../apiCalls'
import { AuthContext } from '../../context/AuthContext'
import { redirect } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const[email,setEmail]= useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate();
    const { dispatch } = useContext(AuthContext);
    

    const handleClick =async(e)=>
    {
      e.preventDefault();
      console.log("clicked");

      const userCredentials =
      {
        email, 
        password
      };

        console.log("userCredentials",userCredentials);

     
    try {
      const response = await loginCalls(userCredentials);

      // console.log('Full response:', response); 

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

    const createNewAcc = async() =>
    {
       navigate("/register")
    }
 
    
  return (
    <div>

            <div className="login">
                <div className="loginWrapper">
                    <div className="loginLeft">
                        <span className='logo'><b className='bold'>TejasSocial</b></span>
                        <span className  ='loginDesc'>Connect with friends and the world <br /> around you on TejasSocial</span>
                    </div>
                    <div className="loginRight">
                        <form action="" className="loginBox" onSubmit={handleClick}>

                        <input value={email} onChange={(e)=>setEmail(e.target.value)} className='loginEmail'type='email'required  placeholder='Enter Your Email' />
                        <input  value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Your Password' required minLength={6} type="password"className="loginPassword" />
                        <button className="loginButton" >LogIn</button>
                        <span className='loginForgetPassword'>forget password?</span>
                        <button className="loginCreateNewAccout" onClick={createNewAcc}>create new account</button>

                        </form>
                    </div>
                </div>
            </div>
           
      
    </div>
  )
}

export default Login
