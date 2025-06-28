import React, { useContext, useState } from 'react';
import './rightbar.css';
import { Users } from '../../dummy';
import Online from '../Online/Online';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const Rightbar = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  console.log("profile ==", user);

  const [isFollowing, setIsFollowing] = useState(false); // State for follow button
  const [error, setError] = useState(null); // State for error handling
  const { user: currentUser } = useContext(AuthContext);
  console.log("current user", currentUser);

   const handleFollow = async (e) => {
    e.preventDefault();
    console.log("followed");

    if (!currentUser?._id || !user?._id) {
      setError("User information not available");
      return;
    }

    try {
     if(!isFollowing)
     {
      const followRes = await axios.put(`http://localhost:8800/api/users/${user._id}/follow`, {
        userId: currentUser._id,
      });
      console.log("follow", followRes);
      setIsFollowing(true); // Update follow state
      
     }
    }
     catch(err)
     {
      console.error(err);
      setError("Failed to follow user");
     }
   
   };

  const homeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img src="/assets/birthdayicon.png" alt="" className="birthdayImgicon" />
          <span className='birthdayText'><b>Tejas</b> and <b>4 others</b> have a birthday today.</span>
        </div>
        <div className="rightbarAd">
          <img src="/assets/ad1.jpg" alt="" className="rightbarAdImg" />
        </div>
        <span><b>Online Friends</b></span>
        <ul>
          {Users.map(u => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const profileRightbar = () => {
    if (!user) {
      return <div>User not found</div>;
    }

    return (
      <>
        <div className="userInfo">
          <b>{user.username || 'Unknown User'}</b>
          {currentUser?._id && user._id && currentUser._id !== user._id && (
            <div className="followButtonContainer">
              <button className="followButton" onClick={handleFollow} disabled={isFollowing}>
                {isFollowing ? "Following" : "Follow"}
              </button>
            </div>
          )}
          {error && <span className="error">{error}</span>} {/* Display error if exists */}
        </div>
        <span className='userInfoAbout'>
          {user?.desc || 'No description available'}
        </span>

        <div className="userInfoFriends">
          <b className='u'>User Friends : </b>
          <div className="useInfoFriendsdiv">
            <div className="UsetInfoFriend">
              <img src={`${PF}person4.jpeg`} alt="" className="userInfoFriendImg" />
              <span>Andrew Tye</span>
            </div>

            <div className="UsetInfoFriend">
              <img src={`${PF}person5.jpeg`} alt="" className="userInfoFriendImg" />
              <span>Simon Taylor</span>
            </div>
            <div className="UsetInfoFriend">
              <img src={`${PF}person3.jpeg`} alt="" className="userInfoFriendImg" />
              <span>Latham Lion</span>
            </div>

            <div className="UsetInfoFriend">
              <img src={`${PF}person2.jpeg`} alt="" className="userInfoFriendImg" />
              <span>Michell Starc</span>
            </div>

            <div className="UsetInfoFriend">
              <img src={`${PF}person6.jpeg`} alt="" className="userInfoFriendImg" />
              <span> Jimmy Anderson</span>
            </div>
            <div className="UsetInfoFriend">
              <img src={`${PF}person5.jpeg`} alt="" className="userInfoFriendImg" />
              <span>Arundhati Roy</span>
            </div>
            <div className="UsetInfoFriend">
              <img src={`${PF}person4.jpeg`} alt="" className="userInfoFriendImg" />
              <span>Karan Thapar</span>
            </div>

            <div className="UsetInfoFriend">
              <img src={`${PF}person3.jpeg`} alt="" className="userInfoFriendImg" />
              <span>Lorence Bishnoi</span>
            </div>
            <div className="UsetInfoFriend">
              <img src={`${PF}person2.jpeg`} alt="" className="userInfoFriendImg" />
              <span>Kaushal Kashyap</span>
            </div>
          </div>
        </div>
        
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? profileRightbar() : homeRightbar()}
       
      </div>
    </div>
  );
};

export default Rightbar;
