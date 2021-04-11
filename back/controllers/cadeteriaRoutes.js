const { Cadeteria, User } = require("../models/index");
const jwt = require("jsonwebtoken");

const cadeteriaController = {
  allCadeterias(req, res, next) {
    Cadeteria.findAll()
      .then((cadeterias) => {
        res.send(cadeterias);
      })
      .catch((error) => {
        next(error);
      });
  },

  editCadeterias(req, res, next) {
    Cadeteria.findByPk(req.params.id).then((cadeteria) => {
      cadeteria
        .update({
          active: !cadeteria.active,
        })
        .then((cadeteria) => res.status(200).send(cadeteria))
        .catch("hubo un error");
    });
  },

  admitCadeterias(req, res, next) {
    Cadeteria.findByPk(req.params.id).then((cadeteria) => {
      cadeteria
        .update({
          active: !cadeteria.active,
          authorized: !cadeteria.authorized,
        })
        .then((cadeteria) => {
          return cadeteria;
        })
        .then((cadeteria) => res.status(200).send(cadeteria))
        .catch((e) => console.log(e));
    });
  },

  admitCadete(req, res, next) {
    User.findByPk(req.params.id).then((cadete) => {
      cadete
        .update({
          active: !cadete.active,
          authorized: !cadete.authorized,
        })
        .then((cadete) => res.status(200).send(cadete));
    });
  },

  registerCadeteria(req, res) {
    Cadeteria.create(req.body)
      .then((cadeteria) => {
        res.status(201).send(cadeteria);
      })
      .catch((err) => res.send(err));
  },

  loginCadeteria(req, res, next) {
    const { email, password } = req.body;
    Cadeteria.findOne({
      where: { email },
    })
      .then((cad) => {
        if (!cad) return res.status(401).send("La cadeteria no existe");

        const isValid = cad.validPassword(password);
        console.log(isValid);
        if (isValid !== true)
          return res.status(401).send("La password es incorrecta");
        const token = jwt.sign(
          {
            id: cad.id,
            email: cad.email,
            nameCompany: cad.nameCompany,
            CUIT: cad.CUIT,
          },
          "P5"
        );
        return res.status(200).json({ token });
      })
      .catch((e) => res.status(401).send("Error en autenticación"));
  },

  editProfileCadeterias(req, res, next) {
    console.log(req.params.id, req.body);
    Cadeteria.findByPk(req.params.id)
      .then((cadeteria) => {
        cadeteria.update(req.body);
      })
      .then((res) => res.status(201).send(res))
      .catch((err) => res.sendStatus(500));
  },
};
module.exports = cadeteriaController;
