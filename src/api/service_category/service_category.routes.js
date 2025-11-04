const express = require("express");
const router = express.Router();
const serviceCategoryController = require("../modules/service_category/service_category.controller");

// 📦 CREATE
router.post("/", serviceCategoryController.createServiceCategory);

// 🔄 UPDATE
router.put("/:id", serviceCategoryController.updateServiceCategory);

// 🔍 GET BY ID
router.get("/:id", serviceCategoryController.getServiceCategoryById);

// 📋 GET ALL
router.get("/", serviceCategoryController.getAllServiceCategories);

// ❌ DELETE
router.delete("/:id", serviceCategoryController.deleteServiceCategory);

// ✅ BULK ACTIVATE
router.put("/activate/many", serviceCategoryController.activateMany);

// 🚫 BULK DEACTIVATE
router.put("/deactivate/many", serviceCategoryController.deactivateMany);

module.exports = router;
