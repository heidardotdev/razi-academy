const CourseCategory = require("../models/CourseCategory");
const mongoose = require("mongoose");

// ---------------- CREATE ----------------
exports.createCategory = async (req, res) => {
  try {
    const { title, img } = req.body;

    if (!title) {
      return res.status(400).json({ error: "title الزامی است" });
    }

    const existing = await CourseCategory.findOne({ title });
    if (existing) {
      return res.status(409).json({ error: "این دسته‌بندی قبلاً وجود دارد" });
    }

    const category = await CourseCategory.create({ title, img });
    res.status(201).json({
      id: category._id,
      title: category.title,
      img: category.img
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// ---------------- GET ONE BY ID ----------------
exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const category = await CourseCategory.findById(id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json({
      id: category._id,
      title: category.title,
      img: category.img
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// ---------------- GET ALL ----------------
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await CourseCategory.find({});
    res.json(categories.map(c => ({
      id: c._id,
      title: c.title,
      img: c.img
    })));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// ---------------- UPDATE ----------------
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, img } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const category = await CourseCategory.findByIdAndUpdate(
      id,
      { title, img },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json({
      id: category._id,
      title: category.title,
      img: category.img
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// ---------------- DELETE ----------------
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const category = await CourseCategory.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
