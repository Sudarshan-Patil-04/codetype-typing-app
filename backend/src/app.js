import express from "express"
import cors from "cors"
import authRoutes from "./routes/auth.routes.js"
import resultRoutes from "./routes/result.routes.js"

const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/results", resultRoutes)

app.get("/", (req, res) => {
  res.send("CodeType Backend is running 🚀")
})


export default app
