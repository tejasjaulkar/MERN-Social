import React from 'react'
import "./topbar.css"
import { Search, Person, Chat, Notifications } from '@mui/icons-material';
import {Link} from 'react-router-dom'

const Topbar = () => {
  return (

    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to ="/" style={{textDecoration:'none'}}>

          <span className="logo" color='white'>TejasSocial</span>

        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchBar">
          <Search className='searchIcon' />
          <input placeholder='search for friends' className="searchInput" />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarlink">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItems">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItems">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItems">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <img src="/assets/person6.jpeg" alt="" className="topbarImg" />
      </div>
    </div>
  )
}

export default Topbar
