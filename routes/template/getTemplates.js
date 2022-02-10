const express = require("express")
const router = express.Router()
const fs = require("fs")

const array = []

router.get("/designs", (req, res) => {
  fs.readdirSync("uploads/templates").forEach((files, id) => {
    let list = {}
    list = {
      id,
      title: files.slice(0, files.length - 5).replace(/_|-/g, " "),
      html: `http://localhost:3000/uploads/templates/${files}`,
    }
    array.push(list)
  })

  fs.writeFile("templates.json", JSON.stringify(array), (err) => {
    if (err) {
      console.error(err)
      return
    } else {
      console.log("array: ", array)
      res.status(200).json({
        data: array,
      })
    }
  })
})

module.exports = router
