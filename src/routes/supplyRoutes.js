const { Router } = require("express");

const {
    getAllSupplies,
    getSupplyById,
    getSupplyByName,
    postSupply,
    putSupply,
    deleteSupply,
} = require("../controllers/supplyController");

const { verifyToken } = require("../controllers/authController");

const router = Router();

router
  .get("/", getAllSupplies)
  .get("/id/:id", getSupplyById)
  .get("/name/", getSupplyByName)
  .post("/", verifyToken, postSupply)
  .put("/", verifyToken, putSupply)
  .delete("/:id", verifyToken, deleteSupply);

module.exports = router;
