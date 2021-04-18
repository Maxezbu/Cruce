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
        .then((cadeteria) => {
          res.status(200).send(cadeteria);
        })
        .catch((err) => res.status(500).send(err));
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

  async editProfileCadeterias(req, res, next) {
    const { nameCompany, phoneNum, address } = req.body;

    try {
      const cadeteria = await Cadeteria.findByPk(req.params.id);
      const updated = await cadeteria.update({
        nameCompany,
        phoneNum,
        address,
      });

      if (updated) res.status(201).send(updated);
      else {
        res.send(updated);
      }
    } catch (e) {
      res.send(e);
    }
  },
};
module.exports = cadeteriaController;
