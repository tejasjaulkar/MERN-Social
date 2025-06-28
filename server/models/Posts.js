import mongoose from "mongoose";

const postScema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    img: {
        type: String
    },
    likes: {
        type: Array,
        default: []
    },
    Bookmarked: {
        type: Array,
        default: []
    },
}, {
    timestamps: true
});

const Post = mongoose.model('Post', postScema);

export default Post;
