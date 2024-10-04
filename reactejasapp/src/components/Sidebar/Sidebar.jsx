import React from 'react'
import './sidebar.css'
import {RssFeed,HelpOutline,WorkOutline,Event,School,Bookmark,Group,Chat,VideoCall}from '@mui/icons-material';
import CloseFriend from '../closefriend/CloseFriend';
import { Users } from '../../dummy';
const Sidebar = () => {
  return (
    <>
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidbarListItems">
                        <RssFeed className="sidebarIcons"></RssFeed>
                        <span className="sidbarListItemText">Feed</span>
                        
                    </li>
                    <li className="sidbarListItems">
                        < HelpOutline className="sidebarIcons"></HelpOutline>
                        <span className="sidbarListItemText">Questions</span>
                        
                    </li>
                    <li className="sidbarListItems">
                        <WorkOutline className="sidebarIcons"></WorkOutline>
                        <span className="sidbarListItemText">Jobs</span>
                        
                    </li> <li className="sidbarListItems">
                        <Event className="sidebarIcons"></Event>
                        <span className="sidbarListItemText">Event</span>
                        
                    </li> <li className="sidbarListItems">
                        <School className="sidebarIcons"></School>
                        <span className="sidbarListItemText">School</span>
                        
                    </li> <li className="sidbarListItems">
                        <Bookmark className="sidebarIcons"></Bookmark>
                        <span className="sidbarListItemText">Bookmarks</span>
                        
                    </li> <li className="sidbarListItems">
                        <Group className="sidebarIcons"></Group>
                        <span className="sidbarListItemText">Group</span>
                        
                    </li> <li className="sidbarListItems">
                        <VideoCall className="sidebarIcons"></VideoCall>
                        <span className="sidbarListItemText">Video</span>
                        
                    </li> <li className="sidbarListItems">
                        <Chat className="sidebarIcons"></Chat>
                        <span className="sidbarListItemText">Chat</span>
                        
                    </li>
                </ul>
                <button className="sidebarButton">Show More</button>
                <hr className='sidebarHr'/>
                <ul className="sidebarFriendList">
                   
                   {Users.map(u=>(
                    <CloseFriend key={u.id} user={u}/>
                   ))}

                </ul>
            </div>
        </div>
    
    </>
  )
}

export default Sidebar
