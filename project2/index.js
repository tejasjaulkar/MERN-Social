import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors'; // Import the CORS package
import userRoute from './public/routes/users.js';
import userAuth from './public/routes/auth.js';
import userPost from './public/routes/posts.js';
import bcrypt from 'bcrypt';
import uploadRouter from './public/routes/upload.js'
import path from 'path'; 
import { fileURLToPath } from 'url';

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
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from your React app
}));


app.use(express.json());
app.use(helmet());
app.use(morgan("common"));


app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'same-site'); // or 'cross-origin'
  next();
});


app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    imgSrc: ["'self'", "http://localhost:8800/uploads", "*"], // Allow all images for testing
  },
}));



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, 'public/uploads')));


// Define routes
app.use("/api/users", userRoute);
app.use("/api/auth", userAuth);
app.use("/api/post", userPost);
app.use('/upload', uploadRouter);

// Homepage route
app.get("/", (req, res) => {
  res.send("homepage");
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});