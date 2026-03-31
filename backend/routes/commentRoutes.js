import express from "express"
import { authMiddleware } from "../middleware/authMiddleware.js"
import { addComment, getCommentsByPost } from "../controllers/commentController.js"

const router = express.Router()

router.post("/", authMiddleware, addComment)
router.get("/:postId", getCommentsByPost)

export default router