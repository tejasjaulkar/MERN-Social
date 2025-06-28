import React from 'react'
import './online.css'
const Online = ({user}) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER ;
  return (
    <div>
          <li className='rightbarFriend'>

            <div className="onlineFriends">
            <img src={PF+user.profilePicture} alt="" className="onlineFriendImg" />
            <span className='onlineFriendNameHeaderIcon'></span>
            <span className="onlineFriendsName"> {user.username}</span>

            </div>
        </li>
      
    </div>
  )
}

export default Online
