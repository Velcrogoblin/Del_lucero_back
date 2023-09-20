const { Supplier, Supply, Op } = require("../db");

const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.findAll({
      include: [{ model: Supply }],
    });

    if (suppliers.length === 0) {
      return res.status(404).json({ message: "No se encontraron proveedores" });
    }

    return res.status(200).json(suppliers);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getSupplierById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "No se envió un id" });
    }

    const supplierById = await Supplier.findByPk(id, {
      include: [{ model: Supply }],
    });

    if (!supplierById) {
      return res
        .status(404)
        .json({ message: `No se encontraron proveedores con el id: ${id}` });
    }

    return res.status(200).json(supplierById);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getSupplierByName = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ message: "No se envió un nombre" });
    }

    const supplierByName = await Supplier.findAll({
      where: {
        name: {
          [Op.iLike]: "%" + name + "%",
        },
      },
      include: [{ model: Supply }],
    });

    if (supplierByName.length === 0) {
      return res
        .status(404)
        .json({ message: `No se encontraron proveedores con el nombre: ${name}` });
    }

    return res.status(200).json(supplierByName);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const postSupplier = async (req, res) => {
  try {
    const { name, phone, address, website, supplies_name } = req.body;

    if (!name || !phone || !supplies_name) {
      return res.status(400).json({ message: "Falta información" });
    }

    const existingSupplier = await Supplier.findOne({ where: { name: name } });


    if (existingSupplier) {
      return res.status(400).json({ message: `${name} ya existe` });
    }

    const supplies = await Supply.findAll({where: {name: supplies_name }})



    const newSupplier = await Supplier.create({
      name,
      phone,
      address,
      website,
    });
    
    await newSupplier.addSupplies(supplies);
    
    return res
      .status(201)
      .json({ message: `${name} fue creado con éxito!` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const putSupplier = async (req, res) => {
  try {
    const { supplier_id, name, phone, address, website, Supplies } = req.body;

    const existingSupplier = await Supplier.findByPk(supplier_id);

    if (!existingSupplier) {
      return res
        .status(404)
        .json({ message: `No se encontraron proveedores con el id: ${id}` });
    }

    const newSupplies = await Supply.findAll({where:{name: Supplies}});

    if(name) {
        existingSupplier.update({ name });
    }

    if(phone) {
        existingSupplier.update({ phone });
    }

    if(address) {
        existingSupplier.update({ address });
    }

    if(website) {
        existingSupplier.update({ website });
    }

    await existingSupplier.setSupplies([]);
    await existingSupplier.addSupplies(newSupplies);



    return res.status(200).json({ message: `${name} fue actualizado con éxito` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteSupplier = async (req, res) => {
    try {
        const { id } = req.params;

        if(!id) {
            return res.status(400).json({message: "No se envió un id"});
        }

        const existingSupplier = await Supplier.findByPk(id);

        if(!existingSupplier) {
            return res.status(404).json({message: `No se encontraron proveedores con el id: ${id}`});
        }

        if(existingSupplier.active === true) {
        await existingSupplier.update({active: false});
        return res.status(200).json({message: `${existingSupplier.name} fue desactivado exitosamente`});
        } else {
            await existingSupplier.update({active: true});
            return res.status(200).json({message: `${existingSupplier.name} fue activado exitosamente`})
        }
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

module.exports = {
    getAllSuppliers,
    getSupplierById,
    getSupplierByName,
    postSupplier,
    putSupplier,
    deleteSupplier,
}
