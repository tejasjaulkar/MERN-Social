import React, { useEffect, useState } from 'react'
import './feed.css'
import Share from '../share/Share'
import Post from '../Post/Post'
import axios from 'axios'


const Feed = ({ username }) => {

  const [posts, setPost] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
     const res =
       username ? await axios.get("http://localhost:8800/api/post/profile/"+username)
       : await axios.get("http://localhost:8800/api/post/timeline/6700de27cf997bdc8afcb2de")
      setPost(res.data)
    }
    fetchPosts();
  }, [username])


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
