import express from "express"
import { authMiddleware } from "../middleware/authMiddleware.js"
import { getPostsByCommunity, createPost, toggleLikePost, deletePost } from "../controllers/postController.js"

const router = express.Router()

router.get("/:communityId", getPostsByCommunity)
router.post("/", authMiddleware, createPost)
router.post("/like/:postId", authMiddleware, toggleLikePost)
router.delete("/:id", authMiddleware, deletePost)

export default router