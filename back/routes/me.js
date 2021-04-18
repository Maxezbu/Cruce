const express = require("express");
const router = express.Router();
const tokenMiddleware = require("./tokenMiddleware");
const { User, Cadeteria } = require("../models/index");

router.get("/", tokenMiddleware, (req, res, next) => {
  const email = req.user.email;
  User.findOne({ where: { email } })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(next);
});

router.get("/cadeteria", tokenMiddleware, (req, res, next) => {
  const email = req.user.email;
  Cadeteria.findOne({ where: { email } })
    .then((cad) => {
      res.status(200).json(cad);
    })
    .catch(next);
});

module.exports = router;
