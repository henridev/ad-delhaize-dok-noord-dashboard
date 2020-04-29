const express = require("express");
const router = express.Router();
const { getKasboek, deleteKasboek } = require("../database/kasboek");

// GET ALL ORDERS

router.get("*", (req, res, next) => {
  getKasboek()
    .then(info => {
      res
        .status(info.statuscode)
        .json({ kasboek: info.kasboek, message: info.message });
    })
    .catch(err => {
      console.error(err);
    });
});

router.delete("/:kasboekId", (req, res, next) => {
  const kasboekId = req.params.kasboekId;
  deleteKasboek(kasboekId)
    .then(kasboek => {
      res.json({ kasboek });
    })
    .catch(err => {
      console.error(err);
    });
});

module.exports = router;
