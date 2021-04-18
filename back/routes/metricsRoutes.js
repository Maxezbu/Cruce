const express = require("express");
const router = express.Router();
const metricsController = require('../controllers/metricsController');


router.get('/:id/cadete-dispatched', metricsController.cadeteDispatchedTotal)
router.get('/:id/cadete-returned', metricsController.cadeteReturnedTotal)



module.exports = router;