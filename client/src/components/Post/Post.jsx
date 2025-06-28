import React, { useState, useEffect, useContext } from 'react';
import { MoreVert, Favorite, ChatBubbleOutline, Share, Delete, Bookmark, Refresh } from '@mui/icons-material';
import { Menu, MenuItem, TextField } from '@mui/material';
import axios from 'axios';
import './post.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Post = ({ post }) => {
  const [like, setLike] = useState(post?.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [postUser, setPostUser] = useState({});
  const [profilePicture, setProfilePicture] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [newTitle, setNewTitle] = useState(post?.title || "");
  const [newContent, setNewContent] = useState(post?.desc || "");
  const [bookmark, setBookmark] = useState('');
  const { user } = useContext(AuthContext);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`http://localhost:8800/api/post/${post?._id}`, {
        data: { userId: user?._id },
      });
      console.log(res.data);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting post:", error.response ? error.response.data : error.message);
    }
    handleMenuClose();
  };

  const handleBookmark = () => {
    console.log('Bookmark post:', post?._id);
    handleMenuClose();
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`http://localhost:8800/api/post/${post?._id}`, {
        userId: user?._id,
        title: newTitle,
        desc: newContent
      });

      console.log("Post updated:", res.data);
      window.location.reload();
    } catch (err) {
      console.error("Error updating post:", err);
    }
  };

  const likeHandler = async () => {
    if (!user?._id) {
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
    const fetchPostUser = async () => {
      if (!post?.userId) return;
      
      try {
        const res = await axios.get(`http://localhost:8800/api/users?userId=${post.userId}`);
        setPostUser(res.data);
        setProfilePicture(res.data?.profilePicture);
      } catch (err) {
        console.error("Error fetching post user:", err);
      }
    };

    fetchPostUser();
  }, [post?.userId]);

  // Check if current user has liked this post
  useEffect(() => {
    if (post?.likes && user?._id) {
      setIsLiked(post.likes.includes(user._id));
    }
  }, [post?.likes, user?._id]);

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${postUser?.username}`}>
              <img
                src={profilePicture ? `${PF}${profilePicture}` : `${PF}noprofile.jpg`}
                alt="img"
                className="postProfileImg"
              />
            </Link>
          </div>
          <div className="postTopRight">
            <MoreVert className="postMoreIcon" onClick={handleMenuOpen} />
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleDelete}>
                <Delete fontSize="small" style={{ marginRight: '8px' }} />
                Delete
              </MenuItem>
              <MenuItem onClick={handleBookmark}>
                <Bookmark fontSize="small" style={{ marginRight: '8px' }} />
                Bookmark
              </MenuItem>
              <MenuItem onClick={handleUpdate}>
                <Refresh fontSize="small" style={{ marginRight: '8px' }} />
                Update
              </MenuItem>
            </Menu>
          </div>
        </div>

        {post.desc && <p className="postText">{post?.desc}</p>}

        {post.img && (
          <img src={`${PF}${post?.img}`} alt="Post content" className="postImg" />
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
              <span>{post?.comment}</span>
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
