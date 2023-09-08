const { Supply, Op } = require("../db");

const getAllSupplies = async (req, res) => {
    try {
        const supplies = await Supply.findAll();

        if(supplies.length === 0) {
            return res.status(400).json({message: "No se enontraron insumos"});
        }

        return res.status(200).json(supplies);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

const getSupplyById = async (req, res) => {
    try {
        const { id } = req.params;

        if(!id) {
            return res.status(400).json({message: "No se envió un id"});
        }

        if(isNaN(id)) {
            return res.status(400).json({message: "El id es inválido"});
        }

        const supplyById = await Supply.findByPk(id);

        if(!supplyById) {
            return res.status(400).json({message: `No se encontró un insumo con el id: ${id}`});
        }

        return res.status(200).json(supplyById);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

const getSupplyByName = async (req, res) => {
    try {
      const { name } = req.query;
  
      if (!name) {
        return res.status(400).json({ message: "No se envió un nombre" });
      }
  
      const supplyByName = await Supply.findAll({where: {
        name: {
          [Op.iLike]: "%" + name + "%",
        },
      },});
  
      if (supplyByName.length === 0) {
        return res
          .status(404)
          .json({ message: `No se encontraron insumos con el nombre: ${name}` });
      }
  
      return res.status(200).json(supplyByName);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  const postSupply = async (req, res) => {
    try {
      const { name, cost } = req.body;
  
      if (!name || !cost) {
        return res.status(400).json({ message: "Falta información" });
      }

      if(isNaN(cost)) {
        return res.status(400).json({message: "El costo debe ser un número"});
      }
  
      const existingSupply = await Supply.findOne({ where: { name: name } });
  
  
      if (existingSupply) {
        return res.status(400).json({ message: `${name} ya existe` });
      }
  
      await Supply.create({
        name,
        cost,
      });
  
      
      return res
        .status(201)
        .json({ message: `${name} fue creado con éxito!` });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  
  const putSupply = async (req, res) => {
    try {
      const { supply_id, name, cost } = req.body;
  
      const existingSupply = await Supply.findByPk(supply_id);
  
      if (!existingSupply) {
        return res
          .status(404)
          .json({ message: `No se encontraron insumos con el id: ${supply_id}` });
      }
  
      if(name) {
          await existingSupply.update({ name });
      }
  
      if(cost) {
          await existingSupply.update({ cost });
      }
  
      return res.status(200).json({ message: `${name} fue actualizado con éxito` });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  const deleteSupply = async (req, res) => {
      try {
          const { id } = req.body;
  
          if(!id) {
              return res.status(400).json({message: "No se envió un id"});
          }
  
          const existingSupply = await Supply.findByPk(id);
  
          if(!existingSupply) {
              return res.status(404).json({message: `No se encontraron insumos con el id: ${id}`});
          }
  
          if(existingSupply.active === true) {
          await existingSupply.update({active: false});
          return res.status(200).json({message: `${existingSupply.name} fue desactivado exitosamente`});
          } else {
              await existingSupply.update({active: true});
              return res.status(200).json({message: `${existingSupply.name} fue activado exitosamente`})
          }
      } catch (error) {
          return res.status(500).json({message: error.message});
      }
  }

  module.exports = {
    getAllSupplies,
    getSupplyById,
    getSupplyByName,
    postSupply,
    putSupply,
    deleteSupply,
  }