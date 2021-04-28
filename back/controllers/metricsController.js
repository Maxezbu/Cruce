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
    const userId = req.params.id;
    try {
      const returned = await Order.findAndCountAll({
        where: { status: "Devuelto a sucursal", userId },
      });
      returned ? res.status(200).send(returned) : res.sendStatus(401);
    } catch (e) {
      res.status(500).send(e);
    }
  },

  /////promedio de una cadeteria en particular
  async averageTimeCadeteria(req, res) {
    console.log(req.params);
    const id = req.params.id;
    let orders;

    try {
      const metricas = {
        deliver: 0,
        returned: 0,
        averageTimeDeli: 0,
        averageTimePick: 0,
        name: "",
      };
      if (req.params.modelo === "cadeteria") {
        orders = await Order.findAll({
          where: {
            cadeteriumId: id,
          },
          include: Cadeteria,
        });
      }
      if (req.params.modelo === "cadete") {
        orders = await Order.findAll({
          where: {
            userId: id,
          },
          include: User,
        });
      }

      let contador = 0;
      orders.map((order) => {
        if (order.status == "Entregado") {
          contador++;
          metricas.deliver += 1;
          metricas.averageTimeDeli += order.deliveryDate - order.pickUpDate;
          metricas.averageTimePick += order.pickUpDate - order.createdAt;
        }
        if (order.status == "Devuelto a sucursal") {
          metricas.returned += 1;
        }
      });
      metricas.averageTimeDeli = metricas.averageTimeDeli / contador;
      metricas.averageTimePick = metricas.averageTimePick / contador;

      res.status(200).send({ metricas });
    } catch (error) {
      console.log(error);
    }
  },

  //promedio de todas las cadeterias
  async avergateTimeAllCadeterias(req, res) {
    let metricas = {};
    try {
      const ordenes = await Order.findAll({
        where: {
          status: ["Entregado", "Devuelto a sucursal"],
        },
        include: Cadeteria,
      });

      ordenes.map((orden) => {
        if (metricas[orden.cadeteriumId]) {
          if (orden.status == "Entregado") {
            metricas[orden.cadeteriumId].contador += 1;
            metricas[orden.cadeteriumId].deliver += 1;
            metricas[orden.cadeteriumId].averageTimeDeli +=
              orden.deliveryDate - orden.pickUpDate;
            metricas[orden.cadeteriumId].averageTimePick +=
              orden.pickUpDate - orden.createdAt;
          }
          if (orden.status == "Devuelto a sucursal") {
            metricas[orden.cadeteriumId].returned += 1;
          }
        } else {
          if (orden.status == "Entregado") {
            metricas[orden.cadeteriumId] = {
              contador: 1,
              deliver: 1,
              returned: 0,
              averageTimeDeli: orden.deliveryDate - orden.pickUpDate,
              averageTimePick: orden.pickUpDate - orden.createdAt,
              name: orden.cadeterium.nameCompany,
            };
          }
          if (orden.status == "Devuelto a sucursal") {
            metricas[orden.cadeteriumId] = {
              contador: 0,
              deliver: 0,
              returned: 1,
              averageTimeDeli: 0,
              averageTimePick: 0,
              name: orden.cadeterium.nameCompany,
            };
          }
        }
      });

      for (const id in metricas) {
        metricas[id].averageTimeDeli /= metricas[id].contador;
        metricas[id].averageTimePick /= metricas[id].contador;
      }
      res.send(metricas);
    } catch (error) {
      console.log(error);
    }
  },

  /// Metricas de todos los cadetes
  async avergateTimeAllCadetes(req, res) {
    console.log("test metricas ====>");
    let metricas = {};
    try {
      const ordenes = await Order.findAll({
        where: {
          status: ["Entregado", "Devuelto a sucursal"],
        },
        include: User,
      });

      ordenes.map((orden) => {
        if (metricas[orden.userId]) {
          if (orden.status == "Entregado") {
            metricas[orden.userId].contador += 1;
            metricas[orden.userId].deliver += 1;
            metricas[orden.userId].averageTimeDeli +=
              orden.deliveryDate - orden.pickUpDate;
            metricas[orden.userId].averageTimePick +=
              orden.pickUpDate - orden.createdAt;
          }
          if (orden.status == "Devuelto a sucursal") {
            metricas[orden.userId].returned += 1;
          }
        } else {
          if (orden.status == "Entregado") {
            metricas[orden.userId] = {
              contador: 1,
              deliver: 1,
              returned: 0,
              averageTimeDeli: orden.deliveryDate - orden.pickUpDate,
              averageTimePick: orden.pickUpDate - orden.createdAt,
              name: orden.user.firstName,
              lastName: orden.user.lastName,
            };
          }
          if (orden.status == "Devuelto a sucursal") {
            metricas[orden.userId] = {
              contador: 0,
              deliver: 0,
              returned: 1,
              averageTimeDeli: 0,
              averageTimePick: 0,
              name: orden.user.firstName,
              lastName: orden.user.lastName,
            };
          }
        }
      });

      for (const id in metricas) {
        metricas[id].averageTimeDeli /= metricas[id].contador;
        metricas[id].averageTimePick /= metricas[id].contador;
      }
      res.send(metricas);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = metricsController;
