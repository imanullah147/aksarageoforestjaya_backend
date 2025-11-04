const express = require("express");
const router = express.Router();
const { login } = require("../controllers/authController");

// === AUTH ROUTES ===
router.post("/login", login);

module.exports = router;
