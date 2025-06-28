# QuillConnect - Social Media Web Application

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) social media application with features like user authentication, posts, likes, follows, and file uploads.

## 🚀 Features

- **User Authentication**: Register, login, and logout functionality
- **User Profiles**: View and edit user profiles with profile pictures
- **Posts**: Create, read, update, and delete posts with images
- **Social Features**: Like/unlike posts, follow/unfollow users
- **Timeline**: View posts from followed users
- **File Upload**: Upload profile pictures and post images
- **Responsive Design**: Modern UI with Material-UI components

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **bcrypt** for password hashing
- **multer** for file uploads
- **helmet** for security headers
- **cors** for cross-origin requests

### Frontend
- **React.js** with hooks and context
- **React Router** for navigation
- **Material-UI** for UI components
- **Axios** for API calls
- **Styled Components** for styling

## 📁 Project Structure

```
mern social/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── context/        # React context for state management
│   │   ├── pages/          # Page components
│   │   └── apiCalls.js     # API functions
│   └── package.json
├── server/                 # Node.js backend
│   ├── models/             # MongoDB schemas
│   ├── public/
│   │   ├── routes/         # API routes
│   │   └── uploads/        # Uploaded files
│   ├── index.js            # Server entry point
│   └── package.json
└── README.md
```

## 🔧 Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory:
   ```
   MONGO_URL=your_mongodb_connection_string
   ```

4. Start the server:
   ```bash
   npm start
   # or for development with nodemon
   npm run dev
   ```

The server will run on `http://localhost:8800`

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the client directory:
   ```
   REACT_APP_PUBLIC_FOLDER=http://localhost:8800/uploads/
   ```

4. Start the development server:
   ```bash
   npm start
   ```

The React app will run on `http://localhost:3000`

## 🔒 Security Fixes Applied

### 1. **Fixed Route Conflicts**
- Resolved duplicate PUT routes in posts.js
- Separated bookmark functionality to `/bookmark` endpoint

### 2. **Improved Error Handling**
- Added proper try-catch blocks
- Consistent error response formats
- Better HTTP status codes

### 3. **Fixed Variable Naming**
- Corrected `userid` to `userId` throughout the codebase
- Consistent naming conventions

### 4. **Enhanced Authentication**
- Fixed action type mismatches in Redux-like context
- Improved login response handling
- Better password validation

### 5. **Code Quality Improvements**
- Removed unnecessary imports (express from models)
- Consistent code formatting
- Better response structures

### 6. **Security Enhancements**
- Added input validation
- Proper authorization checks
- Secure file upload handling

## 🚨 Known Issues Fixed

1. **Route Conflicts**: Fixed duplicate PUT routes that were causing conflicts
2. **Authentication Flow**: Corrected action types and response handling
3. **Error Handling**: Added comprehensive error handling throughout
4. **Variable Inconsistencies**: Fixed naming inconsistencies
5. **Security Vulnerabilities**: Applied npm audit fixes and security best practices

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Users
- `GET /api/users` - Get user by ID or username
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `PUT /api/users/:id/follow` - Follow user
- `PUT /api/users/:id/unfollow` - Unfollow user

### Posts
- `POST /api/post` - Create post
- `GET /api/post/:id` - Get single post
- `PUT /api/post/:id` - Update post
- `DELETE /api/post/:id` - Delete post
- `PUT /api/post/:id/like` - Like/unlike post
- `PUT /api/post/:id/bookmark` - Bookmark/unbookmark post
- `GET /api/post/timeline/:userId` - Get timeline posts
- `GET /api/post/profile/:username` - Get user's posts

### File Upload
- `POST /upload` - Upload file

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

If you encounter any issues or have questions, please open an issue in the repository. 