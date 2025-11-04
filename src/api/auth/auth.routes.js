const express = require("express");
const router = express.Router();
const authController = require("./auth.controller");

// === AUTH ROUTES ===
router.post("/login", authController.login);

module.exports = router;
