import React, { useState , useEffect } from 'react';
import { MoreVert, Favorite, ChatBubbleOutline, Share } from '@mui/icons-material';
import axios from 'axios'
import './post.css';
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'

const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user,setUser] = useState({});
  const [profilePicture,setprofilePicture] = useState("");
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const likeHandler = () => {
    setLike(prev => (isLiked ? prev - 1 : prev + 1));
    setIsLiked(prev => !prev);
  };

   console.log(post.userId)
   useEffect(()=>
    {
       const fetchUser = async() =>
       {
          const res = await axios.get(`http://localhost:8800/api/users?userId=${post?.userId}`)
          setUser(res?.data)
          const profilePic = res?.data?.profilePicture
          setprofilePicture(profilePic);

          // console.log("in post beta",profilePic)
       }
       fetchUser();
    },[post.userId])

  

  return ( 
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
           <Link to={`profile/${user?.username} `}>
           <img src={`http://localhost:3000/assets/${profilePicture}` || PF+"noprofile.jpg" } alt="img" className="postProfileImg" />
            </Link>
            <div className="postUserInfo">
              <span className="postUsername">{user?.username}</span>
              <span className="postDate">{format(post.createdAt)}</span>
            </div>
          </div>
          <div className="postTopRight">
            <MoreVert className="postMoreIcon" />
          </div>
        </div>
        
        {post.desc && <p className="postText">{post?.desc}</p>}
        
       
        {post.img && ( 
          <img src= {PF+post.img}alt="Post content" className="postImg" /> 
        )}
       
        
        <div className="postBottom">
          <div className="postBottomLeft">
            <button
              onClick={likeHandler}
              className={`postButton ${isLiked ? 'liked' : ''}`}
            >
              <Favorite fontSize="small" />
              <span>{like} people like it</span>
            </button>
            <button className="postButton">
              <ChatBubbleOutline fontSize="small" />
              <span>{post.comment}</span>
            </button>
          </div>
          <div className="postBottomRight">
            <button className="postButton">
              <Share fontSize="small" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
