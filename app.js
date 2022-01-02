const express = require("express")
const app = express()

/* APP CONFIGURATION IMPORTATED MODULS */
const morgan = require("morgan")
const bodyParser = require("body-parser")

// CONF
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
)

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET")
    return res.status(200).json({})
  }
  next()
})

app.use(morgan("dev"))
app.use("/uploads", express.static("uploads"))

// @ts-ignore
app.use("/auth", [
  require("./api/routes/auth/signup"),
  require("./api/routes/auth/signin"),
  require("./api/routes/auth/userProfile"),
  require("./api/routes/auth/updateProfile"),
])

app.use((req, res, next) => {
  const error = new Error("Not found")
  // @ts-ignore
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message,
    },
  })
})

app.listen(3000, () => {
  console.log("Server has started on port 3000")
})
