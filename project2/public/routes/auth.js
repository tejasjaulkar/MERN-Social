import express from 'express';
import User from '../../models/User.js';
import bcrypt from 'bcrypt';


const router = express.Router();
//register
router.post("/register",async(req,res)=>
{

  //generating hashed password
  // const salt  = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hash(req.body.password,salt);
  if(req.body.password!=req.body.confirmpassword)
  {
    return res.status(799).json("password check")
  }
  // const registeredEmail = await User.findOne({ email });
  // if(registeredEmail)
  //   {
  //     res.status(200).json("email already registered");
  //   }

  try{

    const newUser = new User({
    // declaring newuser
      username : req.body.username,
      email :req.body.email,
      password : req.body.password,
  
    });
    //saving user
        const user = await newUser.save();
        res.status(200).json(user);
  }
  catch(err){

    console.log(err);
  }

});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // const validPassword = await bcrypt.compare(password, user.password);

    console.log("Entered Password:", password);
    console.log("Stored Hashed Password:", user.password);
    if (password!=user.password) {
   
      return res.status(401).json({ message: "Invalid password" });
    }

    return res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "An error occurred during login." });
  }
});

// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Log received email and password for debugging
//     console.log("Received Email:", email);
//     console.log("Received Password:", password);

//     // Search for the user in the database by email
//     const user = await User.findOne({ email });

//     // If the user is not found, return 404
//     if (!user) {
//       console.log("User not found for email:", email);
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Log found user for debugging
//     console.log("Found User:", user);
//     console.log("Stored Hashed Password:", user.password);

//     // Compare the provided password with the hashed password in the database
//     const validPassword = await bcrypt.compare(password, user.password);

//     // Log the result of the password comparison for debugging
//     console.log("Password match result:", validPassword);

//     // If the password is incorrect, return 401 (Unauthorized)
//     if (!validPassword) {
//       console.log("Invalid password for email:", email);
//       // return res.status(401).json({ message: "Invalid password" });
//     }

//     // If the login is successful, return user details
//   /// if(validPassword)
//    {
//     return res.status(200).json({
//       id: user._id,
//       username: user.username,
//       email: user.email,
//     });
//    }
//   } catch (err) {
//     console.error("Login error:", err);
//     return res.status(500).json({ message: "An error occurred during login." });
//   }
// });

export default router;