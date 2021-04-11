const S = require("sequelize");
const db = require("../db");

class Product extends S.Model {}

Product.init(
  {
    productSku: {
      type: S.STRING,
      allowNull: false,
    },
    productName: {
      type: S.STRING,
      allowNull: false,
    },
    orderNumber: {
      type: S.STRING,
      allowNull: false,
    },
  },

  { sequelize: db, modelName: "product" }
);

module.exports = Product;
