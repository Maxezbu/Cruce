const express = require("express");
const router = express.Router();
const productController = require("../controllers/productRoutes");

router.get("/:orderId", productController.findProductsByOrderForCount);

module.exports = router;
