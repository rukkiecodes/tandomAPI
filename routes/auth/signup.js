const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const User = require("../../models/signup")

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body

  User.find({ email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        res.status(500).json({
          message: "Email exist",
          success: false
        }) 
      } else {
        bcrypt.hash(password, 10, (error, hash) => {
          if (error) {
            return res.status(500).json({
              error,
            })
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              name,
              email,
              password: hash,
            })

            user
              .save()
              .then((user) => {
                console.log(user)
                return res.status(201).json({
                  message: "User created",
                  success: true,
                  user
                })
              })
              .catch((error) => {
                console.log(error)
                res.status(500).json({
                  error,
                })
              })
          }
        })
      }
    })
})

module.exports = router
