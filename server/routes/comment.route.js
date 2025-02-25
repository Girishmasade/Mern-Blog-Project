import { Router } from "express";
import { addComment, commentCount, getComments } from "../controllers/comment.controller.js";

const commentRouter = Router()

commentRouter.post('/add-comment', addComment)
commentRouter.get('/get-comments/:blogid', getComments)
commentRouter.get('/get-count/:blogid', commentCount)

export default commentRouter