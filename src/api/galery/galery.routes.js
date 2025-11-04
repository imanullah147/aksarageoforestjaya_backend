const express = require("express");
const router = express.Router();
const galeryController = require("./galery.controller");
const { checkToken } = require("../../middleware/token_validation");
const upload = require("../../middleware/upload");

// === GALERY ROUTES ===
router.post("/", checkToken, upload.single("photo"), galeryController.createGalery);
router.put("/:id", checkToken, upload.single("photo"), galeryController.editGalery);
router.get("/:id", checkToken, galeryController.getGaleryById);
router.get("/", checkToken, galeryController.getAllGalery);
router.delete("/:id", checkToken, galeryController.deleteGalery);
router.patch("/activate", checkToken, galeryController.aktifkanGalery);
router.patch("/deactivate", checkToken, galeryController.nonAktifkanGalery);

module.exports = router;
