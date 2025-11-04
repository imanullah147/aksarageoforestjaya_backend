const express = require("express");
const router = express.Router();
const serviceController = require("./service.controller");
const { checkToken } = require("../../middleware/token_validation");

// === SERVICE ROUTES ===
router.post("/", checkToken, serviceController.createService);
router.patch("/:id", checkToken, serviceController.updateService);
router.get("/:id", checkToken, serviceController.getServiceById);
router.post("/list", checkToken, serviceController.getAllServices);
router.delete("/:id", checkToken, serviceController.deleteService);
router.patch("/activate/many", checkToken, serviceController.activateMany);
router.patch("/deactivate/many", checkToken, serviceController.deactivateMany);

module.exports = router;
