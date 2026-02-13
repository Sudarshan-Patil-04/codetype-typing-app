import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"

import authRoutes from "./routes/auth.routes.js"
import resultRoutes from "./routes/result.routes.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/results", resultRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err))

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
)
