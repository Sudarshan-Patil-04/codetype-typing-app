import mongoose from "mongoose"

const resultSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    language: {
      type: String,
      required: true
    },
    wpm: {
      type: Number,
      required: true
    },
    accuracy: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
)

export default mongoose.model("Result", resultSchema)
