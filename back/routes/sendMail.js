const express = require("express");
const router = express.Router();
const transporter = require("../utils/mailerConfig");

router.post("/user", (req, res) => {
  const transmitter = req.body.transmitter || {
    nameCompany: "Cruce",
    email: "cruce@gmail.com",
  };

  const receiver = req.body.receiver;
  const name = req.body.name;

  const msg = `Registro exitoso, en espera de confirmacion`;

  const text = `${name}, usted se ha registrado en : ${transmitter.nameCompany} correspondiente al email ${transmitter.email}.`;

  transporter.sendMail(
    {
      from: transmitter.email,
      to: receiver,
      subject: msg,
      text: text,
    },
    (error, info) => {
      error ? res.status(500).send(error.message) : res.status(200).json(info);
    }
  );
});

router.post("/admin", (req, res) => {
  const cadeteria = req.body;
  const text = `Ha llegado una nueva peticion por parte de: ${cadeteria.nameCompany}, email: ${cadeteria.email}`;

  transporter.sendMail(
    {
      from: cadeteria.email,
      to: "pedrocruce0@gmail.com",
      subject: `Nueva peticion de registro: ${cadeteria.nameCompany}`,
      text: text,
    },
    (error, info) => {
      error ? res.status(500).send(error.message) : res.status(200).json(info);
    }
  );
});

module.exports = router;
