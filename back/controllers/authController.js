const { User, Cadeteria } = require("../models");
const jwt = require("jsonwebtoken");
const transporter = require("../utils/mailerConfig");

const authController = {
  async forgotPassword(req, res) {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user)
      res.status(400).send({ error: "El usuario con este email no existe" });
    else {
      const token = jwt.sign({ id: user.id }, "reset-cruce", {
        expiresIn: "20m",
      });

      transporter.sendMail(
        {
          from: "cruceresetpass@gmail.com",
          to: email,
          subject: `Password reset`,
          text: "Pedido de recuperacion de contrase;a",
          html: `<div><b>Click to reset password http://localhost:3000/reset/${token}</b></div>`,
        },
        (error, info) => {
          error
            ? res.status(500).send(error.message)
            : res.status(200).json(info);
        }
      );
      const reset = await user.update({ resetToken: token });
      if (!reset) res.status(400).send("no se ha podido asignar el token");
    }
  },

  async resetPassword(req, res) {
    const { resetToken, newPass } = req.body;

    if (resetToken)
      jwt.verify(resetToken, "reset-cruce", (error, decodedData) => {
        if (error)
          res
            .status(401)
            .send({ error: "El token no es valido o ha expirado" });
      });

    const user = await User.findOne({ where: { resetToken } });
    if (!user) {
      return res
        .status(400)
        .send({ error: "El usuario con este token no existe" });
    } else {
      const obj = { password: newPass, resetToken: "" };
      const resetUser = await user.update(obj);
      const hashPassword = resetUser.hashPassword(resetUser.password);

      const updated = await user.update({ password: hashPassword });

      const sendEmail = transporter.sendMail(
        {
          from: "cruceresetpass@gmail.com",
          to: user.email,
          subject: `Password reset`,
          text: "Se ha producido un cambio de password",
          html: `<div><b>"Tu password cambio"</b></div>`,
        },
        (error, info) => {
          error
            ? res.status(500).send(error.message)
            : res.status(200).json(info);
        }
      );

      updated
        ? res.status(200).send("Tu password ha cambiado exitosamente") &&
          sendEmail
        : res.status(400).send("Error al cambiar la password");
    }
  },
  ///////////////////////////

  async forgotPasswordCadeteria(req, res) {
    const { email } = req.body;
    const cadeteria = await Cadeteria.findOne({ where: { email } });

    if (!cadeteria)
      res.status(400).send({ error: "La cadeteria con este email no existe" });
    else {
      const token = jwt.sign({ id: cadeteria.id }, "reset-cruce", {
        expiresIn: "20m",
      });

      transporter.sendMail(
        {
          from: "cruceresetpass@gmail.com",
          to: email,
          subject: `Password reset`,
          text: "Pedido de recuperacion de contraseña",
          html: `<div><b>Click to reset password http://localhost:3000/reset-cadeteria/${token}</b></div>`,
        },
        (error, info) => {
          error
            ? res.status(500).send(error.message)
            : res.status(200).json(info);
        }
      );
      const reset = await cadeteria.update({ resetToken: token });
      if (!reset) res.status(400).send("no se ha podido asignar el token");
    }
  },

  async resetPasswordCadeteria(req, res) {
    const { resetToken, newPass } = req.body;

    if (resetToken)
      jwt.verify(resetToken, "reset-cruce", (error, decodedData) => {
        if (error)
          res
            .status(401)
            .send({ error: "El token no es valido o ha expirado" });
      });

    const cadeteria = await Cadeteria.findOne({ where: { resetToken } });
    if (!cadeteria) {
      return res
        .status(400)
        .send({ error: "El usuario con este token no existe" });
    } else {
      const obj = { password: newPass, resetToken: "" };
      const resetCadeteria = await cadeteria.update(obj);
      const hashPassword = resetCadeteria.hashPassword(resetCadeteria.password);

      const updated = await cadeteria.update({ password: hashPassword });

      const sendEmail = transporter.sendMail(
        {
          from: "cruceresetpass@gmail.com",
          to: cadeteria.email,
          subject: `Password reset`,
          text: "Se ha producido un cambio de password",
          html: `<div><b>"Tu password cambio"</b></div>`,
        },
        (error, info) => {
          error
            ? res.status(500).send(error.message)
            : res.status(200).json(info);
        }
      );

      updated
        ? res.status(200).send("Tu password ha cambiado exitosamente") &&
          sendEmail
        : res.status(400).send("Error al cambiar la password");
    }
  },
};

module.exports = authController;
