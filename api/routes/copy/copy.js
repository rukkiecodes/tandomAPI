const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/copies", (req, res) => {
  res.status(200).json({
    message: "Copies",
  });
});

module.exports = router;
