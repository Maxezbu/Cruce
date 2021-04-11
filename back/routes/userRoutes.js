const express = require("express");
const router = express.Router();

const userController = require("../controllers/cadeteRoutes");

router.put("/editProfileCadete/:id", userController.editProfileCadete);

module.exports = router;
