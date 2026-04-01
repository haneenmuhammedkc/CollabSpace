import express from "express";
import {
  createProject,
  getAllProjects,
  getProjectById,
  applyToProject,
  acceptApplication,
  rejectApplication,
} from "../controllers/projectController.js";

import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router();

router.post("/", authMiddleware, createProject);
router.get("/", getAllProjects);
router.get("/:id", getProjectById);

router.post("/:id/apply", authMiddleware, applyToProject);

router.patch("/:id/accept", authMiddleware, acceptApplication);
router.patch("/:id/reject", authMiddleware, rejectApplication);

export default router;