
import axios from 'axios'


 export const loginCalls = async(userCredentials)=>
    {
        try
        {
            const res = await axios.post("http://localhost:8800/api/auth/login",userCredentials)
            console.log("hfjhjfh")
            console.log(res.data);
            return res.data;


        }
        catch(err)
        {
            console.log(err);
        }
    };


export const RegisterCalls = async(userData) =>
{
    try{
            const response = await axios.post("http://localhost:8800/api/auth/register",userData)
            // console.log(response.data);
            return response.data;
    }
    catch(err)
    {
        console.log(err);

    }

}