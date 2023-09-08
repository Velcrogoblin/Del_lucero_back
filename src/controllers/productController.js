const { Product, Op } = require("../db");

const getAllProducts = async (req, res) => {
  try {
    let products = await Product.findAll();

    if (products.length === 0) {
      return res.status(404).json({ message: "No se encontraron productos" });
    }

    return res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "No se envió un id" });
    }

    let productById = await Product.findByPk(id);

    if (!productById) {
      return res
        .status(404)
        .json({ message: `No se encontraron productos con el id: ${id}` });
    }

    return res.status(200).json(productById);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getProductByName = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ message: "No se envió un nombre" });
    }

    const productsByName = await Product.findAll({
      where: {
        name: {
          [Op.iLike]: "%" + name + "%",
        },
      },
    });

    if (!productsByName) {
      return res.status(400).json({ message: `${name} no fue encontrado` });
    }

    return res.status(200).json(productsByName);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const postProduct = async (req, res) => {
  console.log(req.body);
  try {
    const { name, width, height, weight, img, duration, earning_percentage } =
      req.body;

    if (!name || !width || !height || !weight || !img || !earning_percentage) {
      return res.status(400).json({ message: "Falta información" });
    }

    let existingProduct = await Product.findOne({
      where: {
        name: name,
      },
    });

    if (existingProduct) {
      return res.status(400).json({ message: `${name} ya existe` });
    }

    await Product.create({
      name,
      width,
      height,
      weight,
      img,
      duration,
      earning_percentage,
    });

    return res
      .status(201)
      .json({ message: `${name} fue creado con éxito!` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



const putProduct = async (req, res) => {
  try {
    const {
      product_id,
      name,
      width,
      height,
      weight,
      img,
      duration,
      earning_percentage,
    } = req.body;

    if (
      !product_id ||
      !name ||
      !width ||
      !height ||
      !weight ||
      !img ||
      !earning_percentage
    ) {
      return res.status(400).json({ message: "Falta información" });
    }

    const existingProduct = await Product.findByPk(product_id);

    if (!existingProduct) {
      return res
        .status(404)
        .json({ message: `No se encontraron productos con el id: ${product_id}` });
    }

    existingProduct.update({
      name,
      width,
      height,
      weight,
      img,
      duration,
      earning_percentage
    });

    return res.status(200).json({ message: `${name} fue actualizado con éxito` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "No se envió un id" });
    }

    const existingProduct = await Product.findByPk(id);

    if (!existingProduct) {
      return res
        .status(400)
        .json({ message: `No se encontraron productos con el id: ${id}` });
    }

    if (existingProduct.active === true) {
      existingProduct.update({ active: false });
      return res.status(200).json({
        message: `${existingProduct.name} fue desactivado con éxito`,
      });
    } else {
      existingProduct.update({ active: true });
      return res.status(200).json({
        message: `${existingProduct.name} fue activado con éxito`,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductByName,
  postProduct,
  deleteProduct,
  putProduct,
};
