const express = require("express");
const router = express.Router();

const loginController = require("../controllers/loginRoutes");
router.post("/", loginController.loginUser);

module.exports = router;
