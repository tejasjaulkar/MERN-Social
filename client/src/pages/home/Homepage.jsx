import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import './home.css'
import Topbar from '../../components/Topbar/Topbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import Rightbar from '../../components/Rightbar/Rightbar'
import Feed from '../../components/Feed/Feed'
import { AuthContext } from '../../context/AuthContext'

const Homepage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect to login if user is not authenticated
  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div>
      <Topbar/>
      <div className="homeContainer">
        <Sidebar/>
        <Feed/>
        <Rightbar/>
      </div>
    </div>
  )
}

export default Homepage
