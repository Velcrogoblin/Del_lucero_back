const { Router } = require("express");

const {
    getAllExpenses,
    getExpenseById,
    getExpenseByName,
    postExpense,
    putExpense,
    deleteExpense,
} = require("../controllers/expenseController");

const { verifyToken } = require("../controllers/authController");

const router = Router();

router
  .get("/", getAllExpenses)
  .get("/id/:id", getExpenseById)
  .get("/name/", getExpenseByName)
  .post("/", verifyToken, postExpense)
  .put("/", verifyToken, putExpense)
  .delete("/:id", verifyToken, deleteExpense);

module.exports = router;
