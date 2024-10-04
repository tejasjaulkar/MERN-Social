import React from 'react'
import './share.css'
import { PermMedia,Label,Room,EmojiEmotions } from '@mui/icons-material'

const Share = () => {
  return (
    <div>
        <div className="shareWrapper">
       
            <div className="shareTop">
                <img src="/assets/person6.jpeg" alt="" className="shareProfieImg" />
                <input  placeholder="Hey what's in your mind Jane?"type="text" className="shareInput" />
            </div>
            <hr className='shareHr' />
            
            <div className="shareBottom">
                <div className="shareOptions">
                    <div className="shareOption">
                        <PermMedia htmlColor='tomato' className="shareIcon"></PermMedia>
                        <span className="shareOptionText">Photo or Video</span>

                    </div>

                    <div className="shareOption">
                        <Label htmlColor = "blue" className="shareIcon"></Label>
                        <span className="shareOptionText">Tag</span>

                    </div>

                    <div className="shareOption">
                        <Room className="shareIcon" htmlColor='green'></Room>
                        <span className="shareOptionText">Location</span>

                    </div>

                    <div className="shareOption">
                        <EmojiEmotions className="shareIcon" htmlColor='rgb(228, 228, 18)'></EmojiEmotions>
                        <span className="shareOptionText">Feelings</span>

                    </div>
                    <button className='shareButton'>Share</button>
                </div>

                

            </div>
        </div>
    </div>
  )
}

export default Share
