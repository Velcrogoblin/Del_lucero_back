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
  .post("/", postClient)
  .put("/edit/", putClient)
  .put("/delete/:id", deleteClient);

module.exports = router;
