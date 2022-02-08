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

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

// @ts-ignore
app.use("/auth", [
  require("./routes/auth/signup"),
  // require("./routes/auth/signin"),
  // require("./routes/auth/userProfile"),
  // require("./routes/auth/updateProfile"),
])

const PORT = process.env.PORT || 5000
app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
)

// // CONF
// app.use(
//   bodyParser.urlencoded({
//     extended: false,
//   })
// )

// app.use(bodyParser.json())

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*")
//   res.header("Access-Control-Allow-Headers", "*")

//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET")
//     return res.status(200).json({})
//   }
//   next()
// })

// app.use(morgan("dev"))
// app.use("/uploads", express.static("uploads"))

// // @ts-ignore
// app.use("/auth", [
//   require("./api/routes/auth/signup"),
//   require("./api/routes/auth/signin"),
//   require("./api/routes/auth/userProfile"),
//   require("./api/routes/auth/updateProfile"),
// ])

// app.use("/design", [
//   require("./api/routes/template/getTemplates"),
// ])

// app.use((req, res, next) => {
//   const error = new Error("Not found")
//   // @ts-ignore
//   error.status = 404
//   next(error)
// })

// app.use((error, req, res, next) => {
//   res.status(error.status || 500)
//   res.json({
//     error: {
//       message: error.message,
//     },
//   })
// })

// app.listen(3000, () => {
//   console.log("Server has started on port 3000")
// })
