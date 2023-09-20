const { Client, Product, Order, Supply } = require("../db");
const regexUUID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [{ model: Client }],
    });

    if (orders.length === 0) {
      return res.status(404).json({ message: "No se encontraron pedidos" });
    }

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "No se envió un id" });
    }

    if (!regexUUID.test(id)) {
      return res.status(400).json({ message: "El id no es válido" });
    }

    const orderById = await Order.findByPk(id, {
      include: [{ model: Client }],
    });

    if (!orderById) {
      return res
        .status(404)
        .json({ message: `No se encontraron pedidos con el id: ${id}` });
    }

    return res.status(200).json(orderById);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const postOrder = async (req, res) => {
  console.log(req.body);
  try {
    const {
      client_id,
      products,
      date,
      delivery_date,
      delivery_method,
      status,
      paid,
      discount
    } = req.body;

    if (
      !products ||
      !date ||
      !delivery_date ||
      !delivery_method ||
      !status ||
      !client_id ||
      !paid
    ) {
      return res.status(400).json({ message: "Falta información" });
    }

    if (!regexUUID.test(client_id)) {
      return res.status(400).json({ message: "El id de cliente no es válido" });
    }

    const client = await Client.findByPk(client_id);

    if (!client_id) {
      return res
        .status(404)
        .json({ message: `No existe cliente con el id: ${client_id}` });
    }


    let totalPrice = products.reduce((accumulator, product) => {
      return accumulator + (product.price * product.quantity);
    }, 0);
       
    totalPrice = Math.round((totalPrice * (100 - discount)) / 100);


    const newOrder = await Order.create({
      date,
      delivery_date,
      delivery_method,
      status,
      products,
      paid,
      discount,
      total_amount: totalPrice
    });

    await newOrder.setClient(client);

    return res.status(201).json({ message: "Tu pedido fue creado con éxito" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const putOrder = async (req, res) => {
  try {
    const { order_id, products, delivery_date, delivery_method, status, paid, discount } =
      req.body;

    if (!order_id) {
      return res.status(400).json({ message: "No se envió un id" });
    }

    if (!regexUUID.test(order_id)) {
      return res.status(400).json({ message: "El id no es válido" });
    }

    const existingOrder = await Order.findByPk(order_id);

    if (!existingOrder) {
      return res
        .status(404)
        .json({ message: `No existe pedido con id: ${order_id}` });
    }

    let totalPrice = products.reduce((accumulator, product) => {
      return accumulator + (product.price * product.quantity);
    }, 0);
       
    totalPrice = Math.round((totalPrice * (100 - discount)) / 100);

    if (products) {
      await existingOrder.update({ products });
    }

    if (delivery_date) {
      await existingOrder.update({ delivery_date });
    }

    if (delivery_method) {
      await existingOrder.update({ delivery_method });
    }

    if (status) {
      await existingOrder.update({ status });
    }

    if (paid) {
      await existingOrder.update({ paid });
    }

    if(discount) {
      await existingOrder.update({ discount });
    }

    await existingOrder.update({total_amount: totalPrice });

    return res
      .status(200)
      .json({ message: `El pedido fue actualizado con éxito` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteOrder =  async (req, res) => {
  try {

    console.log("llega 1");

    const { order_id } = req.body;

    if(!order_id) {
      return res.status(400).json({ message: "No se envió un id"});
    }

    if (!regexUUID.test(order_id)) {
      return res.status(400).json({ message: "El id de pedido no es válido" });
    }

    console.log("llega 2");

    const order = await Order.findByPk(order_id);

    if(!order) {
     return  res.status(400).json({message: `No se encontró una orden con el id: ${order_id}`});
    }

    console.log("llega 3");

    if (order.active === true) {
      await order.update({active: false});
    } else {
      await order.update({active: true});
    }

    return res.status(200).json({message: `El pedido con id ${order_id} ha sido actualizado con éxito`});

  } catch (error) {
    return res.status(500).json({message: error.message});
  }
}

const destroyOrder = async (req, res) => {
  try {
    const { order_id } = req.body;

    if(!order_id) {
      return res.status(400).json({ message: "No se envió un id"});
    }

    if (!regexUUID.test(order_id)) {
      return res.status(400).json({ message: "El id de pedido no es válido" });
    }

    const order = await Order.findByPk(order_id);

    if(!order) {
     return  res.status(400).json({message: `No se encontró una orden con el id: ${order_id}`});
    }

    order.destroy();

    return res.status(200).json({message: "La orden fue eliminada con éxito"});

  } catch (error) {
    return res.status(500).json({message: error.message});
  }
}

module.exports = {
  getAllOrders,
  getOrderById,
  postOrder,
  putOrder,
  destroyOrder,
  deleteOrder
};
