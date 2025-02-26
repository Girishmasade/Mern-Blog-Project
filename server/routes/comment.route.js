import { Router } from "express";
import { addComment, commentCount, deleteComment, getAllComments, getComments } from "../controllers/comment.controller.js";
import { authanticate } from "../middelware/authanticate.js";

const commentRouter = Router()

commentRouter.post('/add-comment', authanticate, addComment)
commentRouter.get('/get-comments/:blogid', getComments)
commentRouter.get('/get-count/:blogid', commentCount)
commentRouter.get('/get-all-comment', authanticate, getAllComments)
commentRouter.delete('/delete/:commentid', authanticate, deleteComment)
export default commentRouter