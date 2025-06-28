import React, { useState, useEffect } from 'react';
import './profile.css';
import Topbar from '../../components/Topbar/Topbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import Rightbar from '../../components/Rightbar/Rightbar';
import Feed from '../../components/Feed/Feed';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { username } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      if (!username) {
        console.log("No username provided");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(`http://localhost:8800/api/users?username=${username}`);
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError(err.message || "Failed to fetch user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!username) {
    return <div>No username provided</div>;
  }

  return (
    <div>
      <Topbar setSearchResult={setSearchResult} />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img src={user.profilePicture || PF + "noprofile.jpg"} alt="" className="profilePic" />
              <img src={user.coverPicture || PF + "cc1.jpg"} alt="" className="profileCoverPic" />
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
