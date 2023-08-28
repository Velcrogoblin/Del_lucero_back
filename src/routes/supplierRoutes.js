const { Router } = require("express");

const {
  getAllSuppliers,
  getSupplierById,
  getSupplierByName,
  postSupplier,
  putSupplier,
  deleteSupplier,
} = require("../controllers/supplierController");

const { verifyToken } = require("../controllers/authController");

const router = Router();

router
  .get("/", getAllSuppliers)
  .get("/id/:id", getSupplierById)
  .get("/name/", getSupplierByName)
  .post("/", postSupplier)
  .put("/", putSupplier)
  .put("/delete/:id", deleteSupplier);

module.exports = router;
