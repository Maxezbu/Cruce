const { User } = require("../models/index");
const jwt = require("jsonwebtoken");

const loginController = {

  loginUser(req, res, next) {
    const { email, password } = req.body;
    User.findOne({
      where: { email },
    })
      .then((user) => {
        if (!user) return res.status(401).send('El usuario no existe')
        const isValid = user.validPassword(password);
        if (isValid !== true)return res.status(401).send('La password es incorrecta')

        const token = jwt.sign(
          {id:user.id,email:user.email,firsName:user.firstName,admin:user.admin},
          "P5"
        );
        return res.status(200).json({token});
      })
      .catch((e) => {
        return res.status(401).send("Error en autenticación");
      });
  },
  logoutUser(req, res, next) {
    res.status(200).send("Usuario deslogeado con éxito");
  },

  


};

module.exports = loginController;
