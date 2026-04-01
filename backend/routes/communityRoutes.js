import express from "express"
import { authMiddleware } from "../middleware/authMiddleware.js"
import { createCommunity, getAllCommunities, getSingleCommunity, joinCommunity, leaveCommunity } from "../controllers/communityController.js"

const router = express.Router()

router.get("/", getAllCommunities)
router.get("/:id", getSingleCommunity)

router.post("/", authMiddleware, createCommunity)
router.post("/join/:id", authMiddleware, joinCommunity)
router.post("/leave/:id", authMiddleware, leaveCommunity)

export default router