import express from 'express';
import User from '../../models/User.js';
import bcrypt from 'bcrypt';

const router = express.Router();
//register
router.post("/register",async(req,res)=>
{

  //generating hashed password
  const salt  = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password,salt);

  try{

    const newUser = new User({
    // declaring newuser
      username : req.body.username,
      email :req.body.email,
      password : hashedPassword,
  
    });
    //saving user
        const user = await newUser.save();
        res.status(200).json(user);
  }
  catch(err){

    console.log(err);
  }

});

//login
router.post("/login",async(req,res)=>
{
 
    try{
      const user = await User.findOne({email:req.body.email});
      if(!user)
      {
        return res.status(404).json("user not found");
      }
    
      const validPassword = await bcrypt.compare(req.body.password,user.password);
      if(!validPassword)
      {
        return res.status(400).json("invalid passs");
      }
      return res.status(200).json(user);
    }
    catch(err){

      res.status(400).json(err);
    }
  

})


export default router;