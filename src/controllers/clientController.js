const { Client, Purchase, Order, Op } = require("../db");
const regexUUID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const getAllClients = async (req, res) => {
  try {
    const clients = await Client.findAll({
      include: [{ model: Purchase }, { model: Order }],
    });

    if (clients.length === 0) {
      return res.status(404).json({ message: "No se encontraron clientes" });
    }

    return res.status(200).json(clients);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getClientById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "No se envió un id" });
    }

    if (!regexUUID.test(id)) {
      return res.status(400).json({ message: "El id no es válido" });
    }

    const clientById = await Client.findByPk(id, {
      include: [{ model: Purchase }, { model: Order }],
    });

    if (!clientById) {
      return res
        .status(404)
        .json({ message: `No se encontraron clientes con el id: ${id}` });
    }

    return res.status(200).json(clientById);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getClientByName = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ message: "No se envió un nombre" });
    }

    const clientByName = await Client.findAll({
      where: {
        name: {
          [Op.iLike]: "%" + name + "%",
        },
      },
      include: [{ model: Purchase }, { model: Order }],
    });

    if (clientByName.length === 0) {
      return res
        .status(404)
        .json({ message: `No se encontraron clientes con el nombre: ${name}` });
    }

    return res.status(200).json(clientByName);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const postClient = async (req, res) => {
  try {
    const { name, phone, address } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ message: "Falta información" });
    }

    const existingClient = await Client.findOne({
      where: {
        name: {
          [Op.iLike]: name,
        },
      },
    });

    if (existingClient) {
      return res.status(400).json({ message: `${name} ya existe` });
    }

    await Client.create({
      name,
      phone,
      address,
    });

    return res.status(201).json({ message: `${name} fue creado con éxito!` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const putClient = async (req, res) => {
  try {
    const { client_id, name, phone, address } = req.body;

    if (!regexUUID.test(client_id)) {
      return res.status(400).json({ message: "El id no es válido" });
    }

    const existingClient = await Client.findByPk(client_id);

    if (!existingClient) {
      return res.status(404).json({
        message: `No se encontraron clientes con el id: ${client_id}`,
      });
    }

    if (name) {
      await existingClient.update({ name });
    }

    if (phone) {
      await existingClient.update({ phone });
    }

    if (address) {
      await existingClient.update({ address });
    }

    return res
      .status(200)
      .json({ message: `${name} fue actualizado con éxito` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "No se envió un id" });
    }

    if (!regexUUID.test(id)) {
      return res.status(400).json({ message: "El id no es válido" });
    }

    const existingClient = await Client.findByPk(id);

    if (!existingClient) {
      return res
        .status(404)
        .json({ message: `No se encontraron clientes con el id: ${id}` });
    }

    if (existingClient.active === true) {
      await existingClient.update({ active: false });
      return res
        .status(200)
        .json({
          message: `${existingClient.name} fue desactivado exitosamente`,
        });
    } else {
      await existingClient.update({ active: true });
      return res
        .status(200)
        .json({ message: `${existingClient.name} fue activado exitosamente` });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllClients,
  getClientById,
  getClientByName,
  postClient,
  putClient,
  deleteClient,
};
