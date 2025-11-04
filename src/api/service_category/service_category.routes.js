const express = require("express");
const router = express.Router();
const controller = require("./service_category.controller");
const { checkToken } = require("../../middleware/token_validation");

router.get("/", controller.getAllCategory);
router.get("/:id", controller.getCategoryById);
router.post("/", checkToken, controller.createCategory);
router.patch("/:id", checkToken, controller.editCategory);
router.delete("/:id", checkToken, controller.deleteCategory);
router.post("/activate", checkToken, controller.activateMany);
router.post("/deactivate", checkToken, controller.deactivateMany);

module.exports = router;
