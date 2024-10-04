import express from 'express';
import User from '../../models/User.js';
import bcrypt from 'bcrypt'

const router = express.Router();

//update user

router.put("/:id",async(req,res)=>
{
    if(req.body.userId === req.params.id )
    {
        if(req.body.password)
        {
            try{
                const salt = await bcrypt.genSalt(10);
                 req.body.password = await bcrypt.hash(req.body.password,salt);
            }
            catch(err)
            {
                console.log(err);
                return res.status(500).json(err);
            }

            try{

                const user = await User.findByIdAndUpdate(req.params.id,{

                    $set:req.body,

                });
               
                res.status(200).json("Account has been updated");
            }
            catch (err)
            {
                console.log(err);
                return res.status(500).json(err);
            }


        }
        else{
            res.status(403).json("You can Upadate only Your Account");
        }
    }
});

//delete User

router.delete("/:id",async(req,res)=>
    {
        if(req.body.userId === req.params.id )
        {
            try{
    
                    const user = await User.findByIdAndDelete(req.params.id);
                   
                    res.status(200).json("Account has been deleted");
                }
                catch (err)
                {
                    console.log(err);
                    return res.status(500).json(err);
                }
        }
            else{
                res.status(403).json("You can delete only Your Account");
            }
        
    });
    
//get user

    router.get("/",async(req,res)=>
    {
        const userId = req.query.userId;
        const username = req.query.username;
        try{
          console.log(username)
            const user = userId ? await User.findById(userId)
                                 :await User.findOne({username:username});
            res.status(200).json(user);

        }
        catch(err)
        {
            res.status(403).json("error ocuured");
        }
    })
//follow user

    router.put("/:id/follow",async(req,res)=>
    {
        if(req.body.userId !== req.params.id)
        {
            try{
                const user = await User.findById(req.params.id);
                const currUser = await User.findById(req.body.userId);
                if(!user.followers.includes(req.body.userId))
                {
                    await user.updateOne({$push:{followers:req.body.userId}});
                    await currUser.updateOne({$push:{following:req.params.id}});
                    res.status(200).json("followed successfully");
                }
                else{
                    res.status(900).json("you cannot follow yourself");
                }
            }
            catch(err)
            {
                res.status(403).json("error occured during follow")
            }
        }
        else
        {
            res.status(405).json("you cannot follow yourself");
        }
    })
//unfollow user

    router.put("/:id/unfollow",async(req,res)=>
    {
        if(req.body.userId !== req.params.id)
        {
            try{
                const user = await User.findById(req.params.id);
            const currUser = await User.findById(req.body.userId);
            if(user.followers.includes(req.body.userId))
            {
                await user.updateOne({$pull:{followers:req.body.userId}});
                await currUser.updateOne({$pull:{following:req.params.id}});
                return res.status(200).json("unfollowed successfully");
            }
            else{
                return res.status(403).json("you haven't followed yet");
            }

            
        }
        catch(err)
        {
            return res.status(405).json("error occured during unfollow");
        }

       
    }
    else{
        res.status(500).json("you cannot unfollow yourself");
    }
});


export default router;