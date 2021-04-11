const express = require("express");
const router = express.Router();
const NewOrderController = require("../controllers/orderRoutes");

router.post("/", NewOrderController.newOrder);
router.get("/", NewOrderController.allOrders);

router.get("/:id", NewOrderController.findOrderById);
router.put("/edit/:id", NewOrderController.changeStateOrders);


module.exports = router;
