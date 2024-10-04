import express from 'express';
import Post from '../../models/Posts.js';
import User from '../../models/User.js'
import bcrypt from 'bcrypt';

const router = express.Router();

router.post("/",async(req,res)=>
{
    const newPost =   new Post(req.body);
    try{

        const savedPost = await newPost.save();
        res.status(200).json("post created");


    }
    catch(err)
    {
        res.status(403).json("error occured")

    }
})

//update post

router.put("/:id",async(req,res)=>
{
    if(req.body.userId === req.params.id)
    {
        try{

            const updatedPost = await Post.findByIdAndUpdate(req.params.id,{
               $set:req.body},
                { new: true } 
            );
            res.status(200).json("post updates");

        }
        catch(err)
        {
            res.status(403).json("error occured during update");
        }
    }
    else {
        
        res.status(409).json({ message: "You are not authorized to update this post" });
      }
});

//delete a post

router.delete("/:id",async(req,res)=>
{
    if(req.body.userId === req.params.id)
    {
        try{
            const userPost = await Post.findByIdAndDelete(req.params.id);
            res.status(200).json("post deleted successfully");
        }
        catch(err)
        {
            res.status(403).json("error occured");
        }
    }
    else
    {
        res.status(420).json("You are not authorised to delete ");
    }
});

//get like and remove like


router.put("/:id/like",async(req,res)=>
{
      try{

        const user = await Post.findById(req.params.id);
        if(!user.likes.includes(req.body.userId))
        {
           await user.updateOne({$push:{likes:req.body.userId}});
           res.status(200).json("liked");
        }
        else{

            if(user.likes.includes(req.body.userId))
                {
                    await user.updateOne({$pull:{likes:req.body.userId}});
                    res.status(200).json("disliked successfully")
                }        
        }
       
      }
      catch(err)
      {
        res.status(403).json("error occured during like");
      }
});

//get post
router.get("/:id",async(req,res)=>
{
    try
    {
        const userPost = await Post.findById(req.params.id);
        res.status(200).json(userPost);

    }
    catch(err)
    {
        res.status(403).json("error occured");

    }

    
});

// timeline posts i.e post of following ones

router.get("/timeline/:userId",async(req,res)=>    
{
   try{
        const currUser = await User.findById(req.params.userId);
        const currUserPost = await Post.find({userId:currUser._id});
        const friendPost = await Promise.all(

            currUser.following.map((friendId)=>
            {
                return Post.find({userId:friendId});
            })
        )
        res.status(200).json(currUserPost.concat(...friendPost));
   }
   catch(err)
   {
        res.status(403).json(err);
   }
});


router.get("/profile/:username",async(req,res)=>    
    {
       try
       {
           const user = await User.findOne({username:req.params.username});
           const posts = await Post.find({userId:user._id});
           res.status(200).json(posts);
       }
       catch(err)
       {
           res.status(403).json("error occured");
       }
    });





export default router;

