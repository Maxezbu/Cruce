const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerRoutes");

router.post("/", registerController.register);


module.exports = router;

