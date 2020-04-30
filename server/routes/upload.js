const express = require("express");
const router = express.Router();
const { uploadKasboekRow } = require("../database/uploads");

router.post("/kasboek", (req, res, next) => {
  const newRow = req.body.newKasboekRow;
  console.log(newRow);
  uploadKasboekRow(newRow)
    .then((returnvalue) => {
      console.log(returnvalue);
      res.send("succesfull upload row");
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;
