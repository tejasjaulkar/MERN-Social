import React from 'react'
import './register.css'

const Register = () => {
  return (
    <div>

<div className="register">
                <div className="registerWrapper">
                    <div className="registerLeft">
                        <span className='logo'><b>TejasSocial</b></span>
                        <span className  ='registerDesc'>Connect with friends and the world <br /> around you on TejasSocial</span>
                    </div>
                    <div className="registerRight">
                        <input placeholder='username' className="registerUsername" />
                        <input className='registerEmail' placeholder='Email' />
                        <input placeholder='Password' className="registerPassword" />
                        <input placeholder='password again' className="registerPasswordAgain" />
                        <button className="registerButton">Sign Up</button>
                        <button className="registerCreateNewAccout">Log into account</button>

                    </div>
                </div>
            </div>
           
      
      
    </div>
  )
}

export default Register
