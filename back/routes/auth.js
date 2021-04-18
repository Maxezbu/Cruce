const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

router.put("/forgot-password", authController.forgotPassword);
router.put("/reset-password", authController.resetPassword);

//Cadeteria
router.put(
  "/forgot-password-cadeteria",
  authController.forgotPasswordCadeteria
);
router.put("/reset-password-cadeteria", authController.resetPasswordCadeteria);

module.exports = router;
