import { Router } from "express";
import { blogLike, likeCount } from "../controllers/blogLike.controller.js";

const blogLikeRouter = Router()

blogLikeRouter.post('/do-like', blogLike)
blogLikeRouter.get('/get-like/:blogid/:userid?', likeCount)

export default blogLikeRouter