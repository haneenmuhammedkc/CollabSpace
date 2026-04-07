import express from "express"
import { authMiddleware } from "../middleware/authMiddleware.js"
import { deleteNotification, getNotifications, getUnreadCount, markAllAsRead, markAsRead } from "../controllers/notificationController.js"

const router = express.Router()

router.get("/", authMiddleware, getNotifications)
router.get("/unread-count", authMiddleware, getUnreadCount)
router.put("/read-all", authMiddleware, markAllAsRead)
router.put("/:id/read", authMiddleware, markAsRead)
router.delete("/:id", authMiddleware, deleteNotification)

export default router