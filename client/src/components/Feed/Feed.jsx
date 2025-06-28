import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './feed.css'
import Share from '../share/Share'
import Post from '../Post/Post'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'

const Feed = ({ username }) => {
  const [posts, setPost] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleUserNotFound = () => {
    console.log("User not found in database, clearing localStorage and redirecting to login");
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  useEffect(() => {
    const fetchPosts = async () => {
      console.log("Feed component - user:", user);
      console.log("Feed component - username:", username);
      
      // Don't fetch if user is not available (unless we're fetching profile posts)
      if (!user && !username) {
        console.log("No user available and no username provided");
        return;
      }

      // Don't fetch timeline if user doesn't have an ID
      if (!username && (!user || !user._id)) {
        console.log("User not available or missing ID");
        return;
      }

      setLoading(true);
      setError(null);
      
      try {
        const url = username 
          ? `http://localhost:8800/api/post/profile/${username}`
          : `http://localhost:8800/api/post/timeline/${user._id}`;
        
        console.log("Fetching posts from URL:", url);
        
        const res = await axios.get(url);
        console.log("Posts response:", res.data);
        
        setPost(res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt); // Sort by date
        }));
        console.log("in feed post: ", res.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
        
        // Check if it's a 404 error with user not found message
        if (err.response?.status === 404 && err.response?.data?.message) {
          console.log("User not found error detected");
          handleUserNotFound();
          return;
        }
        
        setError(err.message || "Failed to fetch posts");
        setPost([]);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [username, user?._id, navigate, dispatch]);

  console.log("Feed component render - posts:", posts);
  console.log("Feed component render - loading:", loading);
  console.log("Feed component render - error:", error);

  if (loading) {
    return <div className="feed">Loading posts...</div>;
  }

  if (error) {
    return <div className="feed">Error: {error}</div>;
  }

  return (
    <>
      <div className="feed">
        <Share />
        {posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            {username ? 'No posts found for this user.' : 'No posts to show.'}
          </div>
        ) : (
          posts.map((p) => (
            <Post key={p._id} post={p} />
          ))
        )}
      </div>
    </>
  )
}

export default Feed 