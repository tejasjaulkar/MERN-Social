import React, { useState , useEffect} from 'react'
import './profile.css'
import Topbar from '../../components/Topbar/Topbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import Rightbar from '../../components/Rightbar/Rightbar'
import Feed from '../../components/Feed/Feed'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const Profile = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER ;
  const [user,setUser] = useState({});
  const {username} = useParams();
  
  useEffect(()=>
    {
       const fetchUser = async() =>
       {
          const res = await axios.get(`http://localhost:8800/api/users?username=${username}`)
          setUser(res.data)
          
       }
       fetchUser();
    },[username])

  return (
    <div>
     <Topbar/>
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
            <div className="profileRightTop">
              <div className="profileCover">
              <img src={user.profilePicture || PF+"noprofile.jpeg"}alt="" className="profilePic" />
              <img src={user.coverPicture || PF+"cover3.jpg"}  alt="" className="profileCoverPic" />
              </div>
            </div>
            
             
             
            <div className="profileRightBottom">
                <Feed username ={username}/>
               
                  <Rightbar user={user}/>
            </div>
        
        </div>
       
      </div>
    </div>
  )
}

export default Profile
