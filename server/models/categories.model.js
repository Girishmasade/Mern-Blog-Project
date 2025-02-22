import mongoose, {Schema} from 'mongoose'

const categorySchema = new Schema (
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        slug: {
            type: String,
            unique: true,
            required: true,
            trim: true
        }
    }, {timestamps: true})

    const Category = mongoose.model('category', categorySchema)
    export default Category