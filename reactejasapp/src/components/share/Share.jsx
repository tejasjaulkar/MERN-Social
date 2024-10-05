import React, { useContext, useState, useEffect } from 'react';
import './share.css';
import { PermMedia, Label, Room, EmojiEmotions } from '@mui/icons-material';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const Share = () => {
    const { user } = useContext(AuthContext);
    const [sharePicture, setSharePicture] = useState("");
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userDetails = await axios.get(`http://localhost:8800/api/users?userId=${user?.id}`);
                console.log("in share", userDetails);
                const sharePic = userDetails?.data?.profilePicture;
                setSharePicture(sharePic);
            } catch (err) {
                console.error("Error fetching user details", err);
            }
        };

        if (user) {
            fetchUserDetails();
        }
    }, [user]);

    return (
        <div>
            <div className="shareWrapper">
                <div className="shareTop">
                    <img
                        src={sharePicture ? `${PF}${sharePicture}` : `${PF}noprofile.jpg`}
                        alt=""
                        className="shareProfieImg"
                    />
                    <input
                        placeholder={`Hey what's in your mind ${user?.username}?`}
                        type="text"
                        className="shareInput"
                    />
                </div>
                <hr className="shareHr" />

                <div className="shareBottom">
                    <div className="shareOptions">
                        <div className="shareOption">
                            <PermMedia htmlColor="tomato" className="shareIcon" />
                            <span className="shareOptionText">Photo or Video</span>
                        </div>

                        <div className="shareOption">
                            <Label htmlColor="blue" className="shareIcon" />
                            <span className="shareOptionText">Tag</span>
                        </div>

                        <div className="shareOption">
                            <Room className="shareIcon" htmlColor="green" />
                            <span className="shareOptionText">Location</span>
                        </div>

                        <div className="shareOption">
                            <EmojiEmotions className="shareIcon" htmlColor="rgb(228, 228, 18)" />
                            <span className="shareOptionText">Feelings</span>
                        </div>
                        <button className="shareButton">Share</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Share;
