const express = require("express");
const router = express.Router();
const userController = require("./user.controller");
const { checkToken } = require("../../middleware/token_validation");

// === USER ROUTES ===
router.post("/", checkToken, userController.createUser);
router.patch("/", checkToken, userController.editUser);
router.get("/:id", checkToken, userController.getUserById);
router.post("/list", checkToken, userController.getUser);
router.delete("/:id", checkToken, userController.deleteUser);
router.patch("/activate/many", checkToken, userController.aktifUserBanyak);
router.patch("/deactivate/many", checkToken, userController.nonAktifUserBanyak);

module.exports = router;
