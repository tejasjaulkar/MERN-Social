import React, { useState } from 'react'
import "./topbar.css"
import { Search, Person, Chat, Notifications } from '@mui/icons-material';
import {Link} from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios'

const Topbar = () => {

  const {user} = useContext(AuthContext);
  const [profilePicture,setprofilePicture]  = useState("");
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // console.log("in topbar",user);
  // console.log(localStorage.getItem("user"))
  
  const fetchUserDetails =async ()=>
  {
    
    const userDetails = await axios.get(`http://localhost:8800/api/users?userId=${user?.id}`)
    const profilePic = userDetails?.data?.profilePicture 
    setprofilePicture(profilePic);
  }
  fetchUserDetails();
  // console.log("userdetails",userDetails)
  return (

    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to ="/" style={{textDecoration:'none'}}>

          <span className="logo" color='white'>TejasSocial</span>

        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchBar">
          <Search className='searchIcon' />
          <input placeholder='search for friends' className="searchInput" />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarlink">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink5">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItems">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItems">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItems">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
          <Link to={`/profile/${user.username}`}>
               <img src={profilePicture ? `${PF}${profilePicture}` : `${PF}noprofile.jpg`} alt="" className="topbarImg" />
          </Link>
      </div>
    </div>
  )
}

export default Topbar
