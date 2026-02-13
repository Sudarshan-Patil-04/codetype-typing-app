import express from "express"
import {
  saveResult,
  getMyResults,
  getLeaderboard
} from "../controllers/result.controller.js"
import { protect } from "../middleware/auth.middleware.js"

const router = express.Router()

// Save result (logged in user)
router.post("/", protect, saveResult)

// Get logged in user's results
router.get("/my", protect, getMyResults)

// Leaderboard by language
router.get("/leaderboard/:language", getLeaderboard)

export default router
