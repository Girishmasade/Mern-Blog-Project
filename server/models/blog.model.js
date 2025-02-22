import mongoose, {Schema} from 'mongoose'

const blogSchema = new Schema (
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Category'
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        slug: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        content: {
            type: String,
            required: true,
            trim: true
        },
        featuredImage: {
            type: String,
            required: true,
            trim: true
        },
    }, {timestamps: true})

    const Blog = mongoose.model('blog', blogSchema, 'blogs')
    export default Blog