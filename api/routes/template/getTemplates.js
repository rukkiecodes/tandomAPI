const express = require("express");
const router = express.Router();
const fs = require("fs")

router.get("/designs", (req, res) => {
  const obj = JSON.parse(fs.readFileSync("templates.json", "utf8"));
  console.log(obj)
  res.status(200).json({
    data: obj
  })
});

module.exports = router;
