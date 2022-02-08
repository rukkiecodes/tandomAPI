const express = require("express");
const router = express.Router();
const db = require("../../middlewares/connection");

router.post("/profile", (req, res) => {
  const { id } = req.body;
  db.select("*")
    .from("users")
    .where({
      id,
    })
    .then((user) => {
      console.log(user);
      if (user.length) {
        res.status(200).json({
          message: "Profile fetched successfuly",
          data: {
            status: 200,
            data: user[0],
          },
        });
      } else {
        res.status(400).json({
          status: 400,
          message: "User does not exist",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        status: 400,
        message: "Error fetching profile",
        error: err,
      });
    });
});

module.exports = router;
