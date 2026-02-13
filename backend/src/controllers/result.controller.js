import Result from "../models/Result.js"

export const saveResult = async (req, res) => {
  try {
    const { language, wpm, accuracy } = req.body

    const result = await Result.create({
      user: req.user._id,
      language,
      wpm,
      accuracy
    })

    res.status(201).json(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getMyResults = async (req, res) => {
  try {
    const results = await Result.find({
      user: req.user._id
    }).sort({ createdAt: -1 })

    res.json(results)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getLeaderboard = async (req, res) => {
  try {
    const results = await Result.find({
      language: req.params.language
    })
      .populate("user", "username")
      .sort({ wpm: -1 })
      .limit(10)

    res.json(results)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
