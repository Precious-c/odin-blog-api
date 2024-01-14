const express = require("express")
const mongoose = require("mongoose")
const logger = require("morgan")
require("dotenv").config({path: "./config/.env" })
const connectDB = require("./config/database")
const postRoutes = require("./routes/postRoute")
const authController = require("./routes/authRoutes")

const app = express()
connectDB()
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(logger("dev"))

app.use("/auth", authController)
app.use("/api", postRoutes)

app.listen(process.env.PORT, () => console.log(`server running on port ${process.env.PORT}`))