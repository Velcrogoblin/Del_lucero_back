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
  .post("/", postSupply)
  .put("/", putSupply)
  .delete("/:id", deleteSupply);

module.exports = router;
