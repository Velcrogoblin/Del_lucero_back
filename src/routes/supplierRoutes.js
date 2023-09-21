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
  .post("/", verifyToken, postSupplier)
  .put("/", verifyToken, putSupplier)
  .put("/delete/:id", verifyToken, deleteSupplier);

module.exports = router;
