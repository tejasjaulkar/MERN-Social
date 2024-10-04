
import React, { useContext } from 'react'
import './login.css'
import { useRef } from 'react'
import { loginCalls } from '../../apiCalls'
import { AuthContext } from '../../context/AuthContext'

const Login = () => {

    const email = useRef();
    const password = useRef();
    const { user,isfetching,error,dispatch} = useContext(AuthContext)

    const handleClick =(e)=>
    {
      e.preventDefault();
      console.log("clicked");
      loginCalls({email:email.current.value,password:password.current.value},dispatch);
    };
    
    console.log(user);
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

                        <input ref={email} className='loginEmail'type='email'required  placeholder='Enter Your Email' />
                        <input ref ={password}placeholder='Enter Your Password' required minLength={6} type="password"className="loginPassword" />
                        <button className="loginButton">Login</button>
                        <span className='loginForgetPassword'>forget password?</span>
                        <button className="loginCreateNewAccout">create new account</button>

                        </form>
                    </div>
                </div>
            </div>
           
      
    </div>
  )
}

export default Login
