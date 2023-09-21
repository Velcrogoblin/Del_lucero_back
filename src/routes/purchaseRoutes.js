const { Router } = require("express");

const {
  getAllPurchases,
  postPurchase,
} = require("../controllers/purchaseController");

const { verifyToken } = require("../controllers/authController");

const router = Router();

router
  .get("/", getAllPurchases)
  .post("/", verifyToken, postPurchase);

module.exports = router;