import express from "express"
import cookieParser from "cookie-parser"

const app = express()

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public")) 
app.use(cookieParser())

// importing routes 
import healthcheckRouter from "./routes/healthcheck.routes.js"

// decalring routes
app.use("/api/v1/healthcheck", healthcheckRouter)


export default app
