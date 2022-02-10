const express = require("express")
const dotenv = require("dotenv")
const morgan = require("morgan")
var cors = require("cors")
const bodyParser = require("body-parser")

const connectDB = require("./config/db")

// Load config
dotenv.config({ path: "./config/config.env" })

connectDB()

const app = express()

app.use(cors())

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
)

app.use(bodyParser.json())

if (process.env.NODE_ENV === "development") app.use(morgan("dev"))

// @ts-ignore
app.use("/auth", [
  require("./routes/auth/signup"),
  require("./routes/auth/signin"),
  require("./routes/auth/userProfile"),
])

app.use("/template", [
  require("./routes/template/getTemplates"),
  require("./routes/template/sendTemplate"),
])

app.use("/uploads", express.static("uploads"))

const PORT = process.env.PORT || 5000
app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
)
