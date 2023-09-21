const { Router } = require("express");

const {
  getAllClients,
  getClientById,
  getClientByName,
  postClient,
  putClient,
  deleteClient,
} = require("../controllers/clientController");

const { verifyToken } = require("../controllers/authController");

const router = Router();

router
  .get("/", getAllClients)
  .get("/id/:id", getClientById)
  .get("/name/", getClientByName)
  .post("/", verifyToken, postClient)
  .put("/edit/", verifyToken, putClient)
  .put("/delete/:id", verifyToken, deleteClient);

module.exports = router;
