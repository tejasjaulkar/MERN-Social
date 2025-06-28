import axios from 'axios'

export const loginCalls = async(userCredentials) => {
    try {
        const res = await axios.post("http://localhost:8800/api/auth/login", userCredentials)
        console.log("Login response:", res.data);
        return res.data; // This returns { message, user }
    }
    catch(err) {
        console.error("Login API error:", err);
        throw err; // Re-throw the error so it can be caught in the component
    }
};

export const RegisterCalls = async(userData) => {
    try {
        const response = await axios.post("http://localhost:8800/api/auth/register", userData)
        console.log("Register response:", response.data);
        return response.data;
    }
    catch(err) {
        console.error("Register API error:", err);
        throw err; // Re-throw the error so it can be caught in the component
    }
}