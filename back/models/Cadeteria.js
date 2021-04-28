const S = require("sequelize");
const db = require("../db");
const crypto = require("crypto");

class Cadeteria extends S.Model {}

Cadeteria.init(
  {
    nameCompany: {
      type: S.STRING,
      allowNull: false,
      unique: { msg: "Este nombre ya existe" },
    },
    CUIT: {
      type: S.STRING,
      allowNull: false,
      unique: { msg: "El CUIT ingresado ya existe" },
      validate: {
        len: { msg: "El CUIT debe tener 11 digitos", args: [11, 11] },
      },
    },
    email: {
      type: S.STRING,
      allowNull: false,
      unique: { msg: "El email ya existe" },
      validate: {
        isEmail: {
          msg: "Agrega un correo válido",
        },
      },
    },
    password: {
      type: S.STRING,
      allowNull: false,
    },
    phoneNum: {
      type: S.STRING,
      allowNull: false,
      unique: { msg: "Ya existe este numero telefonico" },
      validate: {
        len: { msg: "El telefono debe tener 10 digitos", args: [10, 10] },
      },
    },
    active: {
      type: S.BOOLEAN,
      defaultValue: false,
    },
    authorized: {
      type: S.BOOLEAN,
      defaultValue: false,
    },
    address: {
      type: S.STRING,
      allowNull: false,
    },
    salt: {
      type: S.STRING,
    },
    resetToken: {
      type: S.STRING,
      defaultValue: "",
    },
  },
  { sequelize: db, modelName: "cadeteria" }
);

Cadeteria.addHook("beforeCreate", (cadeteria) => {
  cadeteria.salt = crypto.randomBytes(20).toString("hex");
  cadeteria.password = cadeteria.hashPassword(cadeteria.password);
});

Cadeteria.prototype.hashPassword = function (password) {
  return crypto.createHmac("Sha1", this.salt).update(password).digest("hex");
};
Cadeteria.prototype.validPassword = function (passwordEnLogin) {
  return this.password === this.hashPassword(passwordEnLogin);
};

module.exports = Cadeteria;
