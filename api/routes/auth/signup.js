const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const db = require("../../middlewares/connection")

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body

  db.select("*")
    .from("users")
    .where({ email })
    .then((user) => {
      if (user.length) {
        res.status(401).json({
          message: "User already exist. Check your email then try again",
        })
      } else {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              status: 500,
              error: err,
            })
          } else {
            db.insert({
              email,
              name,
              password: hash,
              joined: new Date().toLocaleString(),
            })
              .into("users")
              .then((data) => {
                console.log("DATA: ", data)
                res.status(201).json({
                  data: {
                    message: "User created",
                    status: 201,
                    data: {
                      id: data[0],
                      email,
                      name,
                    },
                  },
                })
              })
              .catch((err) => {
                res.status(500).json({
                  status: 500,
                  message:
                    "User already exist. Check your email then try again",
                  error: err,
                })
              })
          }
        })
      }
    })
    .catch((error) => {
      res.status(500).json({
        status: 500,
        message: "User already exist. Check your email then try again",
        error,
      })
    })

  // bcrypt.hash(password, 10, (err, hash) => {
  //   if (err) {
  //     return res.status(500).json({
  //       status: 500,
  //       error: err,
  //     });
  //   } else {
  //     db.insert({
  //       email,
  //       name,
  //       password: hash,
  //       joined: new Date().toLocaleString(),
  //     })
  //       .into("users")
  //       .then((data) => {
  //         console.log("DATA: ", data);
  //         res.status(201).json({
  //           data: {
  //             message: "User created",
  //             status: 201,
  //             data: {
  //               id: data[0],
  //               email,
  //               name,
  //             },
  //           },
  //         });
  //       })
  //       .catch((err) => {
  //         res.status(500).json({
  //           status: 500,
  //           message: "User already exist. Check your email then try again",
  //           error: err,
  //         });
  //       });
  //   }
  // });
})

module.exports = router
