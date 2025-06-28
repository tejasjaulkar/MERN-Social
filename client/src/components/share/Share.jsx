import React, { useContext, useState, useEffect, useRef } from 'react';
import './share.css';
import { PermMedia, Label, Room, EmojiEmotions } from '@mui/icons-material';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const Share = () => {
    const { user } = useContext(AuthContext);
    const [sharePicture, setSharePicture] = useState("");
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [file, setFile] = useState(null);
    const desc = useRef();
    const [uploadedImage, setUploadedImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (!user?._id) {
                console.log("No user ID available in Share component");
                return;
            }

            try {
                const userDetails = await axios.get(`http://localhost:8800/api/users?userId=${user._id}`);
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
    }, [user?._id]);

    const submitHandler = async (e) => {
        e.preventDefault();
        
        if (!user?._id) {
            alert("Please log in to create a post.");
            return;
        }

        if (!desc.current.value && !file) {
            alert("Please enter a description or upload an image.");
            return;
        }
        
        setIsUploading(true);
    
        try {
            let imageFileName = null;
            if (file) {
                const data = new FormData();
                data.append("file", file);
                
                const uploadResponse = await axios.post("http://localhost:8800/upload", data);
                imageFileName = uploadResponse.data.filename;
                setUploadedImage(imageFileName);
            }
    
            const userPost = {
                userId: user._id,
                desc: desc.current.value,
                img: imageFileName
            };
    
            const postResponse = await axios.post("http://localhost:8800/api/post", userPost);
            console.log("Post created:", postResponse.data);
    
            // Clear the form
            desc.current.value = "";
            setFile(null);
            
        } catch (err) {
            console.error("Error creating post:", err);
            alert("Error creating post. Please try again.");
        } finally {
            setIsUploading(false);
        }
        window.location.reload();
    };

    // Don't render if user is not available
    if (!user) {
        return null;
    }

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
                        ref={desc} 
                    />
                </div>
                <hr className="shareHr" />

                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor="file">
                            <div className="shareOption">
                                <PermMedia htmlColor="tomato" className="shareIcon" />
                                <span className="shareOptionText">Photo or Video</span>
                                <input 
                                    type="file"
                                    id='file'
                                    accept='.jpg,.jpeg,.png'
                                    style={{display:"none"}} 
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </div>
                        </label>

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
                        <button className="shareButton" type='submit' disabled={isUploading}>
                            {isUploading ? 'Sharing...' : 'Share'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Share;