import express from 'express';
import User from '../../models/User.js';
import bcrypt from 'bcrypt'

const router = express.Router();

// Debug endpoint to get all users
router.get("/all", async (req, res) => {
    try {
        const allUsers = await User.find().select('-password');
        console.log("All users:", allUsers);
        res.status(200).json(allUsers);
    } catch (err) {
        console.error("Error fetching all users:", err);
        res.status(500).json({ error: "Error occurred while fetching all users" });
    }
});

//update user
router.put("/:id", async (req, res) => {
    try {
        if (req.body.userId !== req.params.id) {
            return res.status(403).json({ error: "You can update only your account" });
        }

        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                console.error("Error hashing password:", err);
                return res.status(500).json({ error: "Error occurred while hashing password" });
            }
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        
        res.status(200).json({ message: "Account has been updated", user });
    } catch (err) {
        console.error("Error updating user:", err);
        return res.status(500).json({ error: "Error occurred while updating account" });
    }
});

//delete User
router.delete("/:id", async (req, res) => {
    try {
        if (req.body.userId !== req.params.id) {
            return res.status(403).json({ error: "You can delete only your account" });
        }

        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        
        res.status(200).json({ message: "Account has been deleted" });
    } catch (err) {
        console.error("Error deleting user:", err);
        return res.status(500).json({ error: "Error occurred while deleting account" });
    }
});

//get user
router.get("/", async (req, res) => {
    try {
        const userId = req.query.userId;
        const username = req.query.username;
        
        if (!userId && !username) {
            return res.status(400).json({ error: "userId or username is required" });
        }

        const user = userId 
            ? await User.findById(userId)
            : await User.findOne({ username: username });
            
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        
        res.status(200).json(user);
    } catch (err) {
        console.error("Error fetching user:", err);
        res.status(500).json({ error: "Error occurred while fetching user" });
    }
});

//follow user
router.put("/:id/follow", async (req, res) => {
    try {
        if (req.body.userId === req.params.id) {
            return res.status(400).json({ error: "You cannot follow yourself" });
        }

        const user = await User.findById(req.params.id);
        const currUser = await User.findById(req.body.userId);
        
        if (!user || !currUser) {
            return res.status(404).json({ error: "User not found" });
        }

        if (!user.followers.includes(req.body.userId)) {
            await user.updateOne({ $push: { followers: req.body.userId } });
            await currUser.updateOne({ $push: { following: req.params.id } });
            res.status(200).json({ message: "Followed successfully" });
        } else {
            res.status(400).json({ error: "You already follow this user" });
        }
    } catch (err) {
        console.error("Error following user:", err);
        res.status(500).json({ error: "Error occurred during follow" });
    }
});

//unfollow user
router.put("/:id/unfollow", async (req, res) => {
    try {
        if (req.body.userId === req.params.id) {
            return res.status(400).json({ error: "You cannot unfollow yourself" });
        }

        const user = await User.findById(req.params.id);
        const currUser = await User.findById(req.body.userId);
        
        if (!user || !currUser) {
            return res.status(404).json({ error: "User not found" });
        }

        if (user.followers.includes(req.body.userId)) {
            await user.updateOne({ $pull: { followers: req.body.userId } });
            await currUser.updateOne({ $pull: { following: req.params.id } });
            return res.status(200).json({ message: "Unfollowed successfully" });
        } else {
            return res.status(400).json({ error: "You haven't followed this user yet" });
        }
    } catch (err) {
        console.error("Error unfollowing user:", err);
        return res.status(500).json({ error: "Error occurred during unfollow" });
    }
});

export default router;