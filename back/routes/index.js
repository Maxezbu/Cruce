const express = require("express");
const router = express.Router();

const RegisterRoutes = require("./registerRoutes");
const cadeteriaRoutes = require("./cadeteriaRoutes");
const LoginRoutes = require("./loginRoutes");
const ordersRoutes = require("./ordersRoutes");
const productRoutes = require("./productRoutes");
const adminRoutes = require("./adminRoutes");
const Me = require("./me");
const userRoutes = require("./userRoutes");

router.use("/me", Me);
router.use("/register", RegisterRoutes);
router.use("/cadeteria", cadeteriaRoutes);
router.use("/orders", ordersRoutes);
router.use("/product", productRoutes);
router.use("/login", LoginRoutes);
router.use("/admin", adminRoutes);
router.use("/user", userRoutes);

module.exports = router;
