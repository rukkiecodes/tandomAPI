const express = require("express");
const router = express.Router();

const User = require("../../models/signup")
const auth = require("../../middlewares/auth")

router.post("/profile", auth, (req, res) => {
  const { email } = req.body;
  
  User.findOne({ email })
    .exec()
    .then((user) => {
      console.log(user)
      return res.status(200).json({
        user,
        success: true
      })
    })
    .catch((error) => {
      console.log(error)
      return res.status(500).json({
        error,
        success: false
      })
    })
});

module.exports = router;
