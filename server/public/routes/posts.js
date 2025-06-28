import express from 'express';
import Post from '../../models/Posts.js';
import User from '../../models/User.js'

const router = express.Router();

//create post
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(201).json({ message: "Post created successfully", post: savedPost });
    } catch (err) {
        console.error("Error creating post:", err);
        res.status(500).json({ error: "Error occurred while creating post" });
    }
});

// Get all posts (for debugging)
router.get("/all", async (req, res) => {
    try {
        const allPosts = await Post.find().populate('userId', 'username');
        console.log("All posts:", allPosts);
        res.status(200).json(allPosts);
    } catch (err) {
        console.error("Error fetching all posts:", err);
        res.status(500).json({ error: "Error occurred while fetching all posts" });
    }
});

// timeline posts i.e post of following ones - MUST come before /:id route
router.get("/timeline/:userId", async (req, res) => {
    try {
        console.log("Timeline request for userId:", req.params.userId);
        
        const currUser = await User.findById(req.params.userId);
        if (!currUser) {
            console.log("User not found for ID:", req.params.userId);
            return res.status(404).json({ 
                error: "User not found",
                message: "The user ID provided does not exist in the database. Please log in again."
            });
        }
        
        console.log("Found user:", currUser.username);
        
        const currUserPost = await Post.find({ userId: currUser._id });
        console.log("User's own posts:", currUserPost.length);
        
        const friendPost = await Promise.all(
            currUser.following.map((friendId) => {
                return Post.find({ userId: friendId });
            })
        );
        
        const allPosts = currUserPost.concat(...friendPost);
        console.log("Total posts found:", allPosts.length);
        
        res.status(200).json(allPosts);
    } catch (err) {
        console.error("Error fetching timeline:", err);
        res.status(500).json({ error: "Error occurred while fetching timeline" });
    }
});

//get profile - MUST come before /:id route
router.get("/profile/:username", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        
        const posts = await Post.find({ userId: user._id });
        res.status(200).json(posts);
    } catch (err) {
        console.error("Error fetching profile posts:", err);
        res.status(500).json({ error: "Error occurred while fetching profile posts" });
    }
});

//get like and remove like
router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            return res.status(200).json({ message: "The post has been liked" });
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } });
            return res.status(200).json({ message: "The post has been disliked" });
        }
    } catch (err) {
        console.error("Error liking/unliking post:", err);
        return res.status(500).json({ error: "An error occurred while liking the post" });
    }
});

//bookmark post 
router.put("/:id/bookmark", async (req, res) => {
    try {
        const { userId, action } = req.body;
        
        if (!userId || !action) {
            return res.status(400).json({ error: "userId and action are required" });
        }

        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        if (action === 'add') {
            if (!post.Bookmarked.includes(userId)) {
                post.Bookmarked.push(userId);
            }
        } else if (action === "remove") {
            if (post.Bookmarked.includes(userId)) {
                post.Bookmarked = post.Bookmarked.filter(id => id !== userId);
            }
        } else {
            return res.status(400).json({ error: "Invalid action. Use 'add' or 'remove'" });
        }
        
        await post.save();
        res.status(200).json({ message: "Bookmark updated successfully" });
    } catch (err) {
        console.error("Error updating bookmark:", err);
        res.status(500).json({ error: "Error occurred while updating bookmark" });
    }
});

//update post
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        
        if (post.userId !== req.body.userId) {
            return res.status(403).json({ error: "You are not authorized to update this post" });
        }

        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json({ message: "Post updated successfully", post: updatedPost });
    } catch (err) {
        console.error("Error updating post:", err);
        res.status(500).json({ error: "Error occurred during update" });
    }
});

//delete a post
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        
        if (post.userId !== req.body.userId) {
            return res.status(403).json({ error: "You are not authorized to delete this post" });
        }
        
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (err) {
        console.error("Error deleting post:", err);
        res.status(500).json({ error: "Error occurred while deleting post" });
    }
});

//get post - MUST come last
router.get("/:id", async (req, res) => {
    try {
        const userPost = await Post.findById(req.params.id);
        if (!userPost) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.status(200).json(userPost);
    } catch (err) {
        console.error("Error fetching post:", err);
        res.status(500).json({ error: "Error occurred while fetching post" });
    }
});

export default router;

