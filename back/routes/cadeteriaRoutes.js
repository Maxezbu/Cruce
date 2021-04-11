const express = require("express");
const router = express.Router();
const cadeteriaController = require("../controllers/cadeteriaRoutes");

router.post('/login', cadeteriaController.loginCadeteria)
router.post("/register", cadeteriaController.registerCadeteria);
router.get("/allCadeterias", cadeteriaController.allCadeterias);
router.put("/admitCadete/:id", cadeteriaController.admitCadete);
router.put("/editProfileCadeteria/:id", cadeteriaController.editProfileCadeterias);

module.exports = router;
