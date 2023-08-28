const { Router } = require("express");

const {
  getAllOrders,
  getOrderById,
  postOrder,
  putOrder,
  destroyOrder,
} = require("../controllers/orderController");

const { verifyToken } = require("../controllers/authController");

const router = Router();

router
  .get("/", getAllOrders)
  .get("/id/:id", getOrderById)
  .post("/", postOrder)
  .put("/", putOrder)
  .put("/delete/", destroyOrder);

module.exports = router;
