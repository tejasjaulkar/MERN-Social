import React, { useContext, useEffect, useState } from 'react'
import './feed.css'
import Share from '../share/Share'
import Post from '../Post/Post'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'


const Feed = ({ username }) => {

  const [posts, setPost] = useState([])
  const {user} = useContext(AuthContext);
  console.log("here",user)
  
  useEffect(() => {
    const fetchPosts = async () => {
     const res =
       username ? await axios.get("http://localhost:8800/api/post/profile/"+username)
       : await axios.get("http://localhost:8800/api/post/timeline/"+user?.id)
       setPost(Array.isArray(res.data) ? res.data : []);
    }
    fetchPosts();
  }, [username,user?.id])
  
  return (
    <>
      <div className="feed">
        <Share />

        {posts.map((p) =>
        (
          <Post key={p._id} post={p} />
        ))}

      </div>
    </>
  )
}

export default Feed
