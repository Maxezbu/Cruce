const { User } = require("../models/index");
const jwt = require("jsonwebtoken");

const userController = {
  allCadetes(req, res, next) {
    User.findAll()
      .then((cadete) => {
        res.send(cadete);
      })
      .catch((error) => {
        next(error);
      });
  },
  editCadeteState(req, res, next) {
    User.findByPk(req.params.id).then((cadete) => {
      cadete
        .update({
          active: !cadete.active,
        })
        .then((cadete) => res.status(200).send(cadete))
        .catch("hubo un error");
    });
  },
  editProfileCadete(req, res) {
    User.findByPk(req.params.id)
      .then((cadete) => {
        cadete.update(req.body);
      })
      .then(res.sendStatus(201))
      .catch((err) => console.log(err));
  },
};
module.exports = userController;
