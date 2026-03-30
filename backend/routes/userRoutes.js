import express from 'express'
import { loginUser, registerUser, updateUserProfile } from '../controllers/userController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.put("/update", authMiddleware, updateUserProfile)

export default router