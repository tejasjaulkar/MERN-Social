import express from 'express';
import User from '../../models/User.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, email, password, confirmpassword } = req.body;

    if (password !== confirmpassword) {
        return res.status(400).json({ error: "Passwords do not match!" });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already registered!" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save user
        const user = await newUser.save();
        res.status(201).json({ message: "User registered successfully", user });

    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ error: "Registration failed. Please try again later." });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Validate password
        const validPassword = await bcrypt.compare(password, user.password);
        
        if (!validPassword) {
            return res.status(401).json({ error: "Invalid password" });
        }

        return res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                id: user._id, // Keep both for compatibility
                username: user.username,
                email: user.email,
            }
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: "An error occurred during login." });
    }
});

export default router;