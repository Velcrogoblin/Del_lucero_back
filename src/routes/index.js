const { Router } = require("express");
const isAdmin = require("../middlewares/isAdmin");

const purchaseRoutes = require("./purchaseRoutes.js");
const supplierRoutes = require("./supplierRoutes.js")
const productRoutes = require("./productRoutes.js");
const clientRoutes = require("./clientRoutes.js");
const supplyRoutes = require("./supplyRoutes.js");
const expenseRoutes = require("./expenseRoutes");
const orderRoutes = require("./orderRoutes.js");
const authRoutes = require("./authRoutes.js");

const router = Router();

router.use("/purchases", purchaseRoutes);
router.use("/suppliers", supplierRoutes);
router.use("/products", productRoutes);
router.use("/expenses", expenseRoutes);
router.use("/supplies", supplyRoutes);
router.use("/clients", clientRoutes);
router.use("/orders", orderRoutes);
router.use("/auth", authRoutes);

module.exports = router;
