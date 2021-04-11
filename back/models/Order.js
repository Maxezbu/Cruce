const S = require("sequelize");
const db = require("../db");

class Order extends S.Model {}

Order.init(
  {
    clientName: {
      type: S.STRING,
      allowNull: false,
    },
    clientLastName: {
      type: S.STRING,
      allowNull: false,
    },
    orderNumber: {
      type: S.STRING,
      allowNull: false,
    },
    creationDate: {
      type: S.STRING,
      allowNull: false,
    },

    province: {
      type: S.STRING,
      allowNull: false,
    },
    city: {
      type: S.STRING,
      allowNull: false,
    },
    street: {
      type: S.STRING,
      allowNull: false,
    },
    number: {
      type: S.STRING,
      allowNull: false,
    },
    complement: {
      type: S.STRING,
      allowNull: true,
    },
    clientPhone: {
      type: S.STRING,
      allowNull: false,
    },
    // notes: {
    //   type: S.STRING,
    //   allowNull: false,
    // },
    status: {
      type: S.ENUM({
        values: ["Pendiente", "En camino", "Entregado", "Devuelto a sucursal"],
      }),
      defaultValue: "Pendiente",
    },
  },
  { sequelize: db, modelName: "order" }
);

module.exports = Order;
