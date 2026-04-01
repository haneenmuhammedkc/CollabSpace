import express from "express"
import { authMiddleware } from "../middleware/authMiddleware.js"
import { getPostsByCommunity, createPost, toggleLikePost } from "../controllers/postController.js"

const router = express.Router()

router.get("/:communityId", getPostsByCommunity)
router.post("/", authMiddleware, createPost)
router.post("/like/:postId", authMiddleware, toggleLikePost)

export default router