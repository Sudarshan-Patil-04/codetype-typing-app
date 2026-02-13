import express from "express"
import Result from "../models/Result.js"

const router = express.Router()

// Save result
router.post("/save", async (req, res) => {
  try {
    const { username, language, wpm, accuracy } = req.body

    const result = new Result({
      username,
      language,
      wpm,
      accuracy
    })

    await result.save()

    res.json({ message: "Result saved" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get top 10 leaderboard
router.get("/:language", async (req, res) => {
  try {
    const results = await Result.find({
      language: req.params.language
    })
      .sort({ wpm: -1 })
      .limit(10)

    res.json(results)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
