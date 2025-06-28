import bcrypt from 'bcrypt';

const testPassword = '123456'; // Use the password you registered with
const storedHashedPassword = '$2b$10$IWalC0tgOW5WsoChuP8DEuJ4hCv8HkrKqLXpRBKTCZkbu7ERd0t2q' // Replace this with the actual hashed password from your database

// Verify password
const isMatch = await bcrypt.compare(testPassword, storedHashedPassword);
console.log('Password match result:', isMatch); // Should be true if it matches
