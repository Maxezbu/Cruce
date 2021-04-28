const { User, Order, Cadeteria } = require("../models");
const userArr = require("./user");
const cadeteriaArr = require("./cadeteria");

let cadeteriaPromise = () =>
  Cadeteria.bulkCreate(cadeteriaArr, { individualHooks: true })
    .then((res) => {
      console.log(`--> Cadeterias creadas`);
      return res;
    })
    .catch((err) => err);

let userPromise = () =>
  User.bulkCreate(userArr, { individualHooks: true })
    .then((res) => {
      console.log(`-->Usuarios creados`);
      return res;
    })
    .catch((err) => err);

cadeteriaPromise()
  .then(() => userPromise())
  .then(() => console.log(`----Seed terminado----`))
  .catch((err) => err);
