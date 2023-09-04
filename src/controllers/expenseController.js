const { Expense, Op } = require("../db");

const getAllExpenses = async (req, res) => {
    try {
        const expenses = await Expense.findAll();

        if(expenses.length === 0) {
            return res.status(400).json({message: "No se enontraron gastos"});
        }

        return res.status(200).json(expenses);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

const getExpenseById = async (req, res) => {
    try {
        const { id } = req.params;

        if(!id) {
            return res.status(400).json({message: "No se envió un id"});
        }

        if(isNaN(id)) {
            return res.status(400).json({message: "El id es inválido"});
        }

        const expenseById = await Expense.findByPk(id);

        if(!expenseById) {
            return res.status(400).json({message: `No se encontró un gasto con el id: ${id}`});
        }

        return res.status(200).json(expenseById);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

const getExpenseByName = async (req, res) => {
    try {
      const { name } = req.query;
  
      if (!name) {
        return res.status(400).json({ message: "No se envió un nombre" });
      }
  
      const expenseByName = await Expense.findAll({where: {
        name: {
          [Op.iLike]: "%" + name + "%",
        },
      },});
  
      if (expenseByName.length === 0) {
        return res
          .status(404)
          .json({ message: `No se encontraron gastos con el nombre: ${name}` });
      }
  
      return res.status(200).json(expenseByName);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  const postExpense = async (req, res) => {
    try {
      const { name, date, amount } = req.body;
  
      if (!name || !date || !amount) {
        return res.status(400).json({ message: "Falta información" });
      }

      if(isNaN(amount)) {
        return res.status(400).json({message: "La cantidad debe ser un número"});
      }
  
      await Expense.create({
        name,
        date,
        amount,
      });
  
      
      return res
        .status(201)
        .json({ message: `El gasto fue creado con éxito!` });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  
  const putExpense = async (req, res) => {
    try {
      const { expense_id, name, date, amount } = req.body;
  
      const existingExpense = await Expense.findByPk(expense_id);
  
      if (!existingExpense) {
        return res
          .status(404)
          .json({ message: `No se encontraron gastos con el id: ${supply_id}` });
      }
  
      if(name) {
          await existingExpense.update({ name });
      }
  
      if(date) {
          await existingExpense.update({ date });
      }

      if(amount) {
        await existingExpense.update({ amount });
      }
  
      return res.status(200).json({ message: `El gasto fue actualizado con éxito` });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  const deleteExpense = async (req, res) => {
      try {
          const { id } = req.body;
  
          if(!id) {
              return res.status(400).json({message: "No se envió un id"});
          }
  
          const existingExpense = await Expense.findByPk(id);
  
          if(!existingExpense) {
              return res.status(404).json({message: `No se encontraron gastos con el id: ${id}`});
          }
  
          if(existingExpense.active === true) {
          await existingExpense.update({active: false});
          return res.status(200).json({message: `El gasto fue desactivado exitosamente`});
          } else {
              await existingExpense.update({active: true});
              return res.status(200).json({message: `El gasto fue activado exitosamente`})
          }
      } catch (error) {
          return res.status(500).json({message: error.message});
      }
  }

  module.exports = {
    getAllExpenses,
    getExpenseById,
    getExpenseByName,
    postExpense,
    putExpense,
    deleteExpense,
  }