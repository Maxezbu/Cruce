const { User, Order, Cadeteria } = require("../models");

const userArr = require("./user");
const cadeteriaArr = require("./cadeteria");

/** Al crear una tabla que contiene un FK. El método bulkCreate revisa que
 *  dicho id exista en la tabla a la cual quiero relacionar. Por ende se debe
 *  controlar el orden en que se crean las tablas. Primero debo crear las que no
 *  tienen relación con ningunga otra tabla (en su interior no tienen FK),
 *  y luego el resto.**/

let cadeteriaPromise = () =>
  Cadeteria.bulkCreate(cadeteriaArr)
    .then((res) => {
      console.log(`--> Cadeterias creadas`);
      return res;
    })
    .catch((err) => err);

let userPromise = () =>
  User.bulkCreate(userArr)
    .then((res) => {
      console.log(`-->Usuarios creados`);
      return res;
    })
    .catch((err) => err);

cadeteriaPromise()
  .then(() => userPromise())
  .then(() => console.log(`----Seed terminado----`))
  .catch((err) => err);
