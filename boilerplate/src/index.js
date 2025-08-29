import dotenv from "dotenv"
import connectDB from "./utils/db.js"
dotenv.config()

import app from "./app.js"

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`)
  })
})
