import React, { useState, useEffect, useContext } from 'react';
import "./topbar.css";
import { Search, Person, Chat, Notifications, ExitToApp } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const Topbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [profilePicture, setProfilePicture] = useState("");
  const navigate = useNavigate();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetails = await axios.get(`http://localhost:8800/api/users?userId=${user?.id}`);
        const profilePic = userDetails?.data?.profilePicture;
        setProfilePicture(profilePic);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (user?.id) {
      fetchUserDetails();
    }
  }, [user?.id]);

  const handleSignout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" className="logoLink">
          <div className="logo">
            <span className="logo-part quill">Quill</span>
            <span className="logo-part connect">Connect</span>
          </div>
        </Link>
      </div>
      {/* Rest of the component remains the same */}
      <div className="topbarCenter">
        <div className="searchBar">
          <Search className='searchIcon' />
          <input placeholder='Search for friends' className="searchInput" />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user?.username}`} className="profileLink">
          <img 
            src={profilePicture ? `${PF}${profilePicture}` : `${PF}noprofile.jpg`} 
            alt="" 
            className="topbarImg" 
          />
        </Link>
        <button onClick={handleSignout} className="signoutButton">
          <ExitToApp />
          <span>Signout</span>
        </button>
      </div>
    </div>
  );
};

export default Topbar;