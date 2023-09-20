const { Router } = require("express");

const {
  getAllOrders,
  getOrderById,
  postOrder,
  putOrder,
  destroyOrder,
  deleteOrder,
} = require("../controllers/orderController");

const { verifyToken } = require("../controllers/authController");

const router = Router();

router
  .get("/", getAllOrders)
  .get("/id/:id", getOrderById)
  .post("/", postOrder)
  .put("/", putOrder)
  .put("/delete", deleteOrder);

module.exports = router;
