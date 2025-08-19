const express = require("express");
const router = express.Router();
const {
  createCategory,
  getCategoryById,
  getAllCategories,
  updateCategory,
  deleteCategory
} = require("../controllers/courseCategoryController");

// Create
router.post("/", createCategory);

// Get by id
router.get("/:id", getCategoryById);

// Get all
router.get("/", getAllCategories);

// Update
router.put("/:id", updateCategory);

// Delete
router.delete("/:id", deleteCategory);

module.exports = router;
