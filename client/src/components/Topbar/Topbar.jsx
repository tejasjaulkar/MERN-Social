import React, { useState, useEffect, useContext } from 'react';
import "./topbar.css";
import { Search, Person, Chat, Notifications, ExitToApp } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const Topbar = ({ setSearchResult }) => {
  const { user, dispatch } = useContext(AuthContext);
  const [profilePicture, setProfilePicture] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const navigate = useNavigate();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!user?._id) {
        console.log("No user ID available");
        return;
      }
      
      try {
        const userDetails = await axios.get(`http://localhost:8800/api/users?userId=${user._id}`);
        const profilePic = userDetails?.data?.profilePicture;
        setProfilePicture(profilePic);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [user?._id]);

  const handleSignout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchError("");
    setSearchLoading(true);

    if (!searchTerm.trim()) {
      setSearchError("Please enter a username to search");
      setSearchLoading(false);
      return;
    }

    try {
      const res = await axios.get(`http://localhost:8800/api/users?username=${searchTerm.trim()}`);
      
      if (res.data) {
        if (setSearchResult) {
          setSearchResult(res.data);
        }
        console.log("Search result:", res.data);
        navigate(`/profile/${searchTerm.trim()}`);
      } else {
        setSearchError("User not found");
      }
    } catch (err) {
      console.error("Error fetching user:", err);
      if (err.response?.status === 404) {
        setSearchError("User not found");
      } else {
        setSearchError("Search failed. Please try again.");
      }
    } finally {
      setSearchLoading(false);
    }
  };

  // Don't render if user is not available
  if (!user) {
    return null;
  }

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <div className="logoBlock">
          <Link to="/" className="logoLink">
            <div className="logo homepage-logo new-logo">
              <svg className="logoIcon" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 19L19 3M3 19C3 19 5.5 18.5 7.5 16.5C9.5 14.5 13 10 19 3M3 19L9 13" stroke="#1877f2" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="logoText">QuillConnect</span>
            </div>
          </Link>
        </div>
      </div>
      <div className="topbarCenter">
        <form onSubmit={handleSearch} className="searchBar">
          <Search className='searchIcon' />
          <input
            placeholder='Search for friends'
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setSearchError(""); // Clear error when user types
            }}
            value={searchTerm}
            className="searchInput"
            disabled={searchLoading}
          />
          {searchLoading && <div className="searchLoading">Searching...</div>}
        </form>
        {searchError && <div className="searchError">{searchError}</div>}
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
