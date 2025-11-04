const express = require("express");
const router = express.Router();
const controller = require("./service_category.controller");
const { checkToken } = require("../../middleware/token_validation");
const upload = require("../../middleware/upload");

router.get("/", controller.getAllCategory);
router.get("/:id", controller.getCategoryById);
router.post("/", checkToken, upload.single("icon"), controller.createCategory);
router.put("/:id", checkToken, upload.single("icon"), controller.editCategory);
router.delete("/:id", checkToken, controller.deleteCategory);
router.patch("/activate", checkToken, controller.activateMany);
router.patch("/deactivate", checkToken, controller.deactivateMany);

module.exports = router;
