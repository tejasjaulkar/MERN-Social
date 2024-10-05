import React from 'react'
import './rightbar.css'
import { Users } from '../../dummy'
import Online from '../Online/Online'

const Rightbar = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER ;
  console.log("profile ==",user)
  const homeRightbar = () => {

    return (
      <>
        <div className="birthdayContainer">
          <img src="/assets/birthdayicon.png" alt="" className="birthdayImgicon" />
          <span className='birthdayText'><b>Tejas</b> and <b> 4 others</b> have birthday today. </span>
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
    )

  }
  const profileRightbar = () => {
    return (

      <>
        <div className="userInfo">
          <h4>{user.username}</h4>
          <span className='userInfoAbout'>
            {user?.desc}
            
          </span>
        </div>
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
    )
  }

  return (
    <>

      <div className="rightbar">
        <div className="rightbarWrapper">

          {user ? profileRightbar() : homeRightbar()}
        </div>
      </div>
    </>
  )
}

export default Rightbar
