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
    pickUpDate: {
      type: S.DATE,
      defaultValue: null,
    },
    deliveryDate: {
      type: S.DATE,
      defaultValue: null,
    },
    inTransit: {
      type: S.VIRTUAL,
      get() {
        return (
          this.getDataValue("deliveryDate") - this.getDataValue("pickUpDate")
        );
      },
    },
    pickUpaverage: {
      type: S.VIRTUAL,
      get() {
        return this.getDataValue("pickUpDate") - this.getDataValue("createdAt");
      },
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
