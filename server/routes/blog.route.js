import { Router } from "express";
import { addBlog, deleteBlog, editBlog, showAllBlog, updateBlog } from "../controllers/blog.controller.js";
import upload from "../config/multer.js";

const blogRouter = Router()

blogRouter.post('/add-blog', upload.single('file'), addBlog)
blogRouter.get('/edit-blog/:blogid', editBlog)
blogRouter.put('/update-blog/blogid', upload.single('file'), updateBlog)
blogRouter.delete('/delete-blog/blogid', deleteBlog)
blogRouter.get('/show-blog', showAllBlog)

export default blogRouter