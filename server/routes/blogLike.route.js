import { Router } from "express";
import { blogLike, likeCount } from "../controllers/blogLike.controller.js";
import { authanticate } from "../middelware/authanticate.js";

const blogLikeRouter = Router()

blogLikeRouter.post('/do-like', authanticate, blogLike)
blogLikeRouter.get('/get-like/:blogid/:userid?', likeCount)

export default blogLikeRouter