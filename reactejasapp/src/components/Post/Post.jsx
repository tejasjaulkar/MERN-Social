import React, { useState, useEffect } from 'react';
import { MoreVert, Favorite, ChatBubbleOutline, Share } from '@mui/icons-material';
import axios from 'axios';
import './post.css';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const [profilePicture, setProfilePicture] = useState('');
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  // Handle liking the post
  const likeHandler = async () => {
    if (!user._id) {
      console.log("User not logged in");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8800/api/post/${post._id}/like`,
        { userId: user._id }
      );

      if (response.status === 200) {
        setLike((prev) => (isLiked ? prev - 1 : prev + 1));
        setIsLiked((prev) => !prev);
      } else {
        console.error("Failed to like the post:", response.data);
      }
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/users?userId=${post?.userId}`);
        setUser(res.data);
        setProfilePicture(res.data?.profilePicture);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, [post.userId]);

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user?.username}`}>
              <img
                src={profilePicture ? `${PF}${profilePicture}` : `${PF}noprofile.jpg`}
                alt="img"
                className="postProfileImg"
              />
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

        {post.desc && <p className="postText">{post.desc}</p>}

        {post.img && (
          <img src={`${PF}${post.img}`} alt="Post content" className="postImg" />
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
