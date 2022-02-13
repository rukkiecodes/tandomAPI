const express = require("express")
const router = express.Router()
const fs = require("fs")

router.get("/designs", (req, res) => {
  const obj = JSON.parse(fs.readFileSync("templates.json", "utf8"))
  res.status(200).json({
    designs: obj,
    success: true
  })
})

module.exports = router
