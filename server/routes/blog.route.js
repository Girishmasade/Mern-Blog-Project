import { Router } from "express";
import { addBlog, deleteBlog, editBlog, getAllBlogs, getBlog, getBlogByCategory, getRelatedBlog, search, showAllBlog, updateBlog } from "../controllers/blog.controller.js";
import upload from "../config/multer.js";
import { authanticate } from "../middelware/authanticate.js";

const blogRouter = Router()

blogRouter.post('/add-blog', authanticate, upload.single('file'), addBlog)
blogRouter.get('/edit/:blogid', authanticate, editBlog)
blogRouter.put('/update-blog/:blogid', authanticate, upload.single('file'), updateBlog)
blogRouter.delete('/delete-blog/:blogid', authanticate, deleteBlog)
blogRouter.get('/get-all', authanticate, showAllBlog)

blogRouter.get('/get-blog/:slug', getBlog)
blogRouter.get('/get-related-blog/:category/:blog', getRelatedBlog)
blogRouter.get('/get-blog-category/:category', getBlogByCategory)
blogRouter.get('/search', search)

blogRouter.get('/blogs', getAllBlogs)

export default blogRouter