const express = require("express");
const router = express.Router();
const serviceController = require("./service.controller");
const { checkToken } = require("../../middleware/token_validation");

// === SERVICE ROUTES ===
router.post("/", checkToken, serviceController.createService);
router.put("/:id", checkToken, serviceController.updateService);
router.get("/", checkToken, serviceController.getAllServices);
router.delete("/:id", checkToken, serviceController.deleteService);
router.patch("/activate", checkToken, serviceController.activateMany);
router.patch("/deactivate", checkToken, serviceController.deactivateMany);

module.exports = router;
