const express = require("express");
const router = express.Router();
const metricsController = require('../controllers/metricsController');

router.get('/:id/cadete-dispatched', metricsController.cadeteDispatchedTotal)
router.get('/:id/cadete-returned', metricsController.cadeteReturnedTotal)
router.get('/:id/:modelo/cadeteria-average', metricsController.averageTimeCadeteria)
router.get('/cadeteria-average', metricsController.avergateTimeAllCadeterias)
router.get('/cadete-average', metricsController.avergateTimeAllCadetes)

module.exports = router;