const express = require("express");
const router = express.Router();
const { getOrders, deleteOrder } = require("../database/orders");

// GET ALL ORDERS

router.get("*", (req, res, next) => {
  getOrders()
    .then(bestellingen => {
      res.json({ bestellingen });
    })
    .catch(err => {
      console.error(err);
    });
});

router.delete("/:orderId", (req, res, next) => {
  const orderIds = req.params.orderId;
  deleteOrder(orderIds)
    .then(() => {
      console.log("succesful deletion");
      res.status(200).json({
        message: "succesfully deleted orders",
        orders: orderIds
      });
    })
    .catch(err => {
      console.error(err, "error during delete");
      res.status(500);
    });
});

module.exports = router;
