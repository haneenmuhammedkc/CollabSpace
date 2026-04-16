import express from "express"
import { authMiddleware } from "../middleware/authMiddleware.js"
import { getMessages, markAsRead, sendMessage } from "../controllers/messageController.js"

const router = express.Router()

router.post("/", authMiddleware, sendMessage)
router.get("/:chatId", authMiddleware, getMessages)
router.post("/read", authMiddleware, markAsRead)

export default router