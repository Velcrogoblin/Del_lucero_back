const { Router } = require("express");

const {
  getAllProducts,
  getProductById,
  getProductByName,
  postProduct,
  putProduct,
  deleteProduct,
} = require("../controllers/productController");
const { verifyToken } = require("../controllers/authController");

const router = Router();

router
  .get("/", getAllProducts)
  .get("/id/:id", getProductById)
  .get("/name/", getProductByName)
  .post("/", verifyToken, postProduct)
  .put("/edit", verifyToken, putProduct)
  .put("/delete/:id", verifyToken, deleteProduct);

module.exports = router;
