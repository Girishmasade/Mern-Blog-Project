import mongoose, { Schema } from "mongoose";

const blogLikeSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    blogid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'blog'
    },
}, {timestamps: true})

const BlogLike = mongoose.model('bloglike', blogLikeSchema, 'bloglikes ')
export default BlogLike