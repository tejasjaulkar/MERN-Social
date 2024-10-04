import mongoose from "mongoose";
import express from 'express';


const postScema =  new mongoose.Schema({

    userId:{
        type:String,
        required:true
    },
    desc:
    {
        type:String
    },
    img:{
        type:String
    },
    likes:{
        type:Array,
        default:[]
    },
},

    {
        timestamps:true
    }

);

const Post = mongoose.model('Post',postScema);

export default Post;
