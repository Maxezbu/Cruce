const { User } = require("../models/index");
const jwt = require("jsonwebtoken");

const userController = {
  allCadetes(req, res, next) {
    User.findAll({
      where: {
        admin: false,
      },
    })
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
        .catch((err) => res.status(500).send(err));
    });
  },
  
  async editProfileCadete(req, res) {
    const { firstName, lastName, phoneNum, vehicle } = req.body;
    try {
      const cadete = await User.findByPk(req.params.id);
      const updated = await cadete.update({
        firstName,
        lastName,
        phoneNum,
        vehicle,
      });
      if (updated) res.status(201).send(res);
      else res.status(500).send(updated);
    } catch (err) {
      res.send(err);
    }
  },
};
module.exports = userController;
