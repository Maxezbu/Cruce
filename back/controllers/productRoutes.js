const { Order, Product } = require("../models");
const sequelize = require("sequelize");

const productController = {
  async findProductsByOrderForCount(req, res, next) {
    const products = await Product.findAndCountAll({
      where: { orderNumber: req.params.orderId },
      attributes: [
        "productName",
        sequelize.fn("count", sequelize.col("productName")),
      ],
      group: ["productName"],
    }).catch((e) => console.log(e));
    res.send(products);
  },
};

module.exports = productController;
