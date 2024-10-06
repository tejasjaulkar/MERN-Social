import React, { useContext, useState, useEffect , useRef} from 'react';
import './share.css';
import { PermMedia, Label, Room, EmojiEmotions } from '@mui/icons-material';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';


const Share = () => {
    const { user } = useContext(AuthContext);
    const [sharePicture, setSharePicture] = useState("");
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [files,setFiles] = useState(null);
    const desc = useRef();

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

  const  submitHandler = async(e) =>
    {
        e.preventDefault();
        console.log("in handleer")
        const userPost = 
        {
            userId : user.id,
            desc : desc.current.value

        };
        
        const response = await axios.post("http://localhost:8800/api/post",userPost)

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

                <form className="shareBottom"  onSubmit={submitHandler}>
                    <div className="shareOptions">
                      <label htmlFor="file">
                         <div className="shareOption">
                                <PermMedia htmlColor="tomato" className="shareIcon" />
                                <span className="shareOptionText">Photo or Video</span>
                                <input type="file"
                                 id='file'
                                accept='.jpg,.jpeg,.png'
                                style={{display:"none"}} 
                                onChange={(e)=>setFiles(e.target.files)}/>
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
                        <button className="shareButton" type='submit'>Share</button>
                    </div>
               
            </form>
            </div>
        </div>
    );
};

export default Share;
