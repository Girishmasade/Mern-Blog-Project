import cloudinary from '../config/cloudinary.js'
import {handleError} from '../helpers/handleError.js'
import Blog from '../models/blog.model.js'
import {encode} from 'entities'

// mern-blog-project
export const addBlog = async(req, res, next) => {
    try {
        const data = JSON.parse(req.body.data)
        
            let featuredImage = ''

           if (req.file) {
              const uploadResult = await cloudinary.uploader
              .upload(
                  req.file.path, {
                    folder: 'mern-blog-project',
                      resource_type: 'auto'
                  }
              )
              .catch((error) => {
                next(handleError(500, error.message))
              });
           
              featuredImage = uploadResult.secure_url
             
            }
        
        const blog = new Blog({
            author: data.author,
            title: data.title,
            category: data.category,
            slug: data.slug,
            featuredImage: featuredImage,
            content: encode(data.content)
        })

        await blog.save()
        res.status(200).json({
            success: true,
            message: 'Blog Added successfully'
        })

    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const editBlog = async(req, res, next) => {
    try {
        
    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const updateBlog = async(req, res, next) => {
    try {
        
    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const deleteBlog = async(req, res, next) => {
    try {
        
    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const showAllBlog = async(req, res, next) => {
    try {
        const blog = await Blog.find().populate('author', 'name avatar role').populate('category', 'name slug').sort({ createdAt: -1 }).lean().exec()
        res.status(200).json({
            blog
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}