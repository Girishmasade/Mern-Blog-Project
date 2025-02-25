import { Router } from "express";
import { addBlog, deleteBlog, editBlog, getBlog, showAllBlog, updateBlog } from "../controllers/blog.controller.js";
import upload from "../config/multer.js";

const blogRouter = Router()

blogRouter.post('/add-blog', upload.single('file'), addBlog)
blogRouter.get('/edit/:blogid', editBlog)
blogRouter.put('/update-blog/:blogid', upload.single('file'), updateBlog)
blogRouter.delete('/delete-blog/:blogid', deleteBlog)
blogRouter.get('/get-all', showAllBlog)
blogRouter.get('/get-blog/:slug', getBlog)

export default blogRouter