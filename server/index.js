const express = require("express")

require("dotenv").config({ path: "./.env" })

const mongoose = require("mongoose")

// cross origin resource sharing
const cors = require("cors")

const cookieParser = require("cookie-parser")
const protect = require("./middlewares/protect.js")

// url mdhun how many times data dene - rate limiting,   npm i express-rate-limit
const rateLimit = require("express-rate-limit")

mongoose.connect(process.env.MONGO_URL)

const app = express()

// const limiter = rateLimit({
//     window: 1000 * 60,
//     //  5 request
//     max: 5
// })

// app.use(limiter)

// frontend address,                            credentials - sending cookie
app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? 'https://todo-apps-client.vercel.app/'
        : 'http://localhost:3000',
    credentials: true
}))

app.use(express.json())    // req. body
app.use(cookieParser())  // for req. cookies data takt

// middleware   protect -  on all routes
app.use("/api/todo", protect, require("./routes/todo.routes.js"))

app.use("/api/auth", require("./routes/auth.routes.js"))

mongoose.connection.once("open", () => {
    console.log("db connected");
    app.listen(process.env.PORT, console.log("server running..."))
})

module.exports = app;
