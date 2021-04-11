const express = require("express");
const router = express.Router();
const cadeteriaController = require("../controllers/cadeteriaRoutes");
const userController = require("../controllers/cadeteRoutes");
//RUTAS CADETERIA
router.get("/allCadeterias", cadeteriaController.allCadeterias);
router.put("/editCadeterias/:id", cadeteriaController.editCadeterias);
router.put("/admitCadeterias/:id", cadeteriaController.admitCadeterias);

// RUTAS CADETE
router.get("/allCadetes", userController.allCadetes);
router.put("/editCadete/:id", userController.editCadeteState);
router.put("/editProfileCadete/:id", userController.editProfileCadete);

module.exports = router;
