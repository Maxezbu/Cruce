const { Order, Product, User, Cadeteria } = require("../models");

const metricsController = {
  async cadeteDispatchedTotal(req, res) {
    const userId = req.params.id;
    try {
      const dispatched = await Order.findAndCountAll({
        where: { status: "Entregado", userId },
      });
      dispatched ? res.status(200).send(dispatched) : res.sendStatus(401);
    } catch (e) {
      res.status(500).send(e);
    }
  },

  async cadeteReturnedTotal(req, res) {
      const userId = req.params.id
    try {
      const returned = await Order.findAndCountAll({
        where: { status: "Devuelto a sucursal", userId },
      });
      returned ? res.status(200).send(returned) : res.sendStatus(401);
    } catch (e) {
      res.status(500).send(e);
    }
  },
};

module.exports = metricsController;
