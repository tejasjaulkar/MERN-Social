import React, { useState, useEffect } from 'react';
import './profile.css';
import Topbar from '../../components/Topbar/Topbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import Rightbar from '../../components/Rightbar/Rightbar';
import Feed from '../../components/Feed/Feed';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Profile = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { username } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (!username) {
        console.log("No username provided");
        setError("No username provided");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(`http://localhost:8800/api/users?username=${username}`);
        if (res.data) {
          setUser(res.data);
        } else {
          setError("User not found");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        if (err.response?.status === 404) {
          setError("User not found");
        } else {
          setError(err.message || "Failed to fetch user");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px'
      }}>
        Loading profile...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        gap: '20px'
      }}>
        <div style={{ fontSize: '18px', color: '#c62828' }}>Error: {error}</div>
        <button 
          onClick={() => navigate('/')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#1877f2',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Go to Home
        </button>
      </div>
    );
  }

  if (!username) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px'
      }}>
        No username provided
      </div>
    );
  }

  return (
    <div>
      <Topbar setSearchResult={setSearchResult} />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img 
                src={user.profilePicture ? `${PF}${user.profilePicture}` : `${PF}noprofile.jpg`} 
                alt="Profile" 
                className="profilePic" 
              />
              <img 
                src={user.coverPicture ? `${PF}${user.coverPicture}` : `${PF}cc1.jpg`} 
                alt="Cover" 
                className="profileCoverPic" 
              />
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={searchResult || user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
