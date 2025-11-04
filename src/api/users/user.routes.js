const express = require("express");
const router = express.Router();
const userController = require("./user.controller");
const { checkToken } = require("../../middleware/token_validation");

// === USER ROUTES ===
router.post("/", checkToken, userController.createUser);
router.put("/", checkToken, userController.editUser);
router.get("/:id", checkToken, userController.getUserById);
router.get("/", checkToken, userController.getUser);
router.delete("/:id", checkToken, userController.deleteUser);
router.patch("/activate", checkToken, userController.aktifUserBanyak);
router.patch("/deactivate", checkToken, userController.nonAktifUserBanyak);

module.exports = router;
