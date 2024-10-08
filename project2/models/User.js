import mongoose from "mongoose";
import express from 'express';


const userScema =  new mongoose.Schema({

    username:{
        type:String,
        required:true,
        min : 3,
        max : 20,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:6,

    },
    profilePicture:{
        
        type:String,
        default:""
    },
    coverPicture:{
        
        type:String,
        default:""
    },
    followers:{
        type:Array,
        default:[]
    },
    following :{
        type:Array,
        default:[]
    },
    isAdmin :{
        type:Boolean,
        default:false
    },
    desc :{

        type:String,
        max:50,
        default:""
    },
    city:{
        type:String,
        max:50
    },
    from:
    {
        type:String,
        max:50,
    },
    relationship:{
        type:Number,
        enum:[1,2,3]
    },
},

{
    timestamps:true
}

)

const User = mongoose.model('User',userScema);

export default User;
