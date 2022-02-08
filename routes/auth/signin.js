const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const User = require("../../models/signup")

router.post("/signin", (req, res) => {
  const { email, password } = req.body

  User.find({ email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed",
          success: false,
        })
      }
      bcrypt.compare(password, user[0].password, (error, response) => {
        if (error) {
          return res.status(401).json({
            message: "Auth failed",
            success: false,
          })
        }
        if (response) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "7d",
            }
          )
          return res.status(200).json({
            message: "Auth successful",
            user,
            token: token,
            success: true,
          })
        }
        res.status(401).json({
          message: "Auth failed",
          success: false,
        })
      })
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        error,
      })
    })
})

module.exports = router
