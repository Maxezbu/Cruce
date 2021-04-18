const S = require("sequelize");
const db = require("../db");
const crypto = require("crypto");

class User extends S.Model {}

User.init(
  {
    firstName: {
      type: S.STRING,
      allowNull: false,
    },
    lastName: {
      type: S.STRING,
      allowNull: false,
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
    admin: {
      type: S.BOOLEAN,
      defaultValue: false,
    },

    authorized: {
      type: S.BOOLEAN,
      defaultValue: false,
    },

    active: {
      type: S.BOOLEAN,
      defaultValue: false,
    },
    vehicle: {
      type: S.ENUM({
        values: ["bicicleta", "auto", "moto"],
      }),
    },
    resetToken: {
      type: S.STRING,
      defaultValue: "",
    },
    salt: {
      type: S.STRING,
    },
  },
  { sequelize: db, modelName: "user" }
);



User.addHook("beforeCreate", (user) => {
  user.salt = crypto.randomBytes(20).toString("hex");
  user.password = user.hashPassword(user.password);
});

User.prototype.hashPassword = function (password) {
  return crypto.createHmac("Sha1", this.salt).update(password).digest("hex");
};

User.prototype.validPassword = function (passwordEnLogin) {
  return this.password === this.hashPassword(passwordEnLogin);
};

module.exports = User;
