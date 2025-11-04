const express = require("express");
const router = express.Router();
const galeryController = require("./galery.controller");
const { checkToken } = require("../../middleware/token_validation");

// === GALERY ROUTES ===
router.post("/", checkToken, galeryController.createGalery);
router.patch("/:id", checkToken, galeryController.editGalery);
router.get("/:id", checkToken, galeryController.getGaleryById);
router.post("/list", checkToken, galeryController.getAllGalery);
router.delete("/:id", checkToken, galeryController.deleteGalery);
router.patch("/activate/many", checkToken, galeryController.aktifkanGalery);
router.patch("/deactivate/many", checkToken, galeryController.nonAktifkanGalery);

module.exports = router;
