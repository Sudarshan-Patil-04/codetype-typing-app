export const getLeaderboard = async (req, res) => {
  try {
    const results = await Result.find({})

      .populate("user", "username")  // fetch username from User model
      .sort({ wpm: -1 })
      .limit(10)

    res.json(results)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
