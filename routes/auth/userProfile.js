const express = require("express");
const router = express.Router();

const User = require("../../models/signup")
const auth = require("../../middlewares/auth")

router.get("/profile", auth, (req, res) => {
  const { email } = req.body;
  
  User.findOne({ email })
    .exec()
    .then((user) => {
      console.log(user)
      return res.status(200).json(user)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        error,
      })
    })
});

module.exports = router;
