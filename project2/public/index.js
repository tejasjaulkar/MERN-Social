import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors'; // Import the CORS package
import userRoute from './routes/users.js';
import userAuth from './routes/auth.js';
import userPost from './routes/posts.js';
import bcrypt from 'bcrypt';

const app = express();
const port = 8800;
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// Define routes
app.use("/api/users", userRoute);
app.use("/api/auth", userAuth);
app.use("/api/post", userPost);

// Homepage route
app.get("/", (req, res) => {
  res.send("homepage");
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
