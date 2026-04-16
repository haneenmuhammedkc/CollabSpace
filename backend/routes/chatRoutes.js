import express from "express"
import { authMiddleware } from "../middleware/authMiddleware.js"
import { getOrCreateChat, getUserChats } from "../controllers/chatController.js"

const router = express.Router()

router.post("/get-or-create", authMiddleware, getOrCreateChat)
router.get("/", authMiddleware, getUserChats)

export default router