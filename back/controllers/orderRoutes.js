const { Order, Product, User, Cadeteria } = require("../models");

const NewOrderController = {
  newOrder(req, res, next) {
    const orders = req.body.items;
    orders.map((order) => {
      Product.create({
        productName: order["SKU Name"],
        productSku: order["ID_SKU"],
        orderNumber: order.Order,
      });
    });
    let ids = [];
    let newOrders = [];
    orders.map((order) => {
      if (!ids.includes(order.Order)) {
        newOrders.push(order);
        ids.push(order.Order);
      }
    });
    let lastOrders = [];
    newOrders.map((order) => {
      Order.create({
        clientName: order["Client Name"],
        clientLastName: order["Client Last Name"],
        creationDate: order["Creation Date"],
        orderNumber: order.Order,
        province: order["UF"],
        clientPhone: order.Phone,
        city: order.City,
        street: order.Street,
        number: order.Number,
        complement: order.Complement,
      }).then((order) => lastOrders.push(order));
    });

    res.status(200).send(lastOrders);
  },

  async allOrders(req, res) {
    try {
      const cadeteria = await Cadeteria.findByPk(req.params.id);
      const ordenes = await Order.findAll({
        where: {
          cadeteriumId: cadeteria.id,
        },
      });
      if (cadeteria.active == true) {
        const orders = await Order.findAll();
        res.send(orders);
      }
      if (cadeteria.active == false) {
        res.status(200).send({ state: cadeteria.active, orders: ordenes });
      }
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  },

  async findOrderById(req, res) {
    const id = req.params.id;
    try {
      const order = await Order.findByPk(id);
      res.send(order);
    } catch (e) {
      res.send(e);
    }
  },

  /*  changeStateOrders(req, res) {
    const orderNumber = req.params.id;
    const status = req.body.status;
    const cadeteId = req.body.cadeteId; 
    User.findByPk(cadeteId)
      .then((cadete) => {
        Cadeteria.findByPk(cadete.cadeteriumId).then((cadeteria) => {
          Order.findOne({
            where: {
              orderNumber: orderNumber,
            },
          }).then((order) => {
            if (order.userId) res.send("La orden ya está asignada");
            if (order.status === "Pendiente") {
              order
                .setUser(cadete)
                .then(order.setCadeterium(cadeteria))
                .then(
                  order.update({
                    status: status,
                    pickUpDate: Date.now(),
                  })
                )
            
            }
            if (order.status === "En camino") {
              order
                .update({
                  status: status,
                  deliveryDate: Date.now(),
                })
                
            }
          });
        });
      })
      .catch((err) => res.send(err));
  },  */

  async changeStateOrders(req, res) {
    const orderNumber = req.params.id;
    const status = req.body.status;
    const cadeteId = req.body.cadeteId;
    try {
      const cadete = await User.findByPk(cadeteId);
      const cadeteria = await Cadeteria.findByPk(cadete.cadeteriumId);
      const order = await Order.findOne({
        where: {
          orderNumber: orderNumber,
        },
      });

      if (order.userId && status === "En camino")
        res.send("La orden ya está asignada");
      else if (order.status === "Pendiente") {
        await order.setUser(cadete);
        await order.setCadeterium(cadeteria);
        const updated = await order.update({
          status: status,
          pickUpDate: Date.now(),
        });
        res.send(updated);
      } else if (order.status === "En camino") {
        const updated = await order.update({
          status: status,
          deliveryDate: Date.now(),
        });
        res.send(updated);
      }
    } catch (e) {
      res.send(e);
    }
  },

  async ordersFromAdmin(req, res) {
    try {
      const orders = await Order.findAll({});
      res.send(orders);
    } catch (e) {
      res.send(e);
    }
  },
};

module.exports = NewOrderController;
