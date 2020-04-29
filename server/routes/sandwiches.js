const express = require("express");
const router = express.Router();
const {
  get_sandwiches,
  delete_sandwich,
  create_sandwich,
  patch_sandwich
} = require("../database/sandwiches");

// GET ALL ORDERS
router.get("*", (req, res, next) => {
  get_sandwiches()
    .then(sandwiches => {
      res.json({ sandwiches });
    })
    .catch(err => {
      console.error(err);
    });
});

router.delete("/:id", (req, res, next) => {
  const sandwichId = req.params.id;
  delete_sandwich(sandwichId)
    .then(() => {
      console.log("succesful deletion");
      res.status(200).json({
        message: "succesfully deleted orders"
      });
    })
    .catch(err => {
      console.error(err, "error during delete");
      res.status(500);
    });
});

router.patch("", (req, res, next) => {
  const changes = req.body;
  console.log(changes);
  patch_sandwich(changes.name, changes)
    .then(() => {
      res.status(200).json({
        message: "succesfully changed sandwich"
      });
    })
    .catch(err => {
      console.error(err, "error during change");
      res.status(500);
    });
});

router.post("", (req, res, next) => {
  const newSandwich = req.body;
  create_sandwich(newSandwich)
    .then(() => {
      res.status(200).json({
        message: "succesfully created sandwich"
      });
    })
    .catch(err => {
      console.error(err, "error during creation");
      res.status(500);
    });
});

module.exports = router;
