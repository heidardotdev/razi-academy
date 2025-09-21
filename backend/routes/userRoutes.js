const express = require("express");
const multer = require("multer");
const {
  signUp,
  signIn,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  banUser,
  getBannedUsers,
  unbanUser,
  getUserByToken,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/profileImages"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.get("/me", authMiddleware, getUserByToken);
router.post("/signup", upload.single("profile"), signUp);
router.post("/signin", signIn);
router.get("/", getAllUsers);
router.post("/", upload.single("profile"), createUser);
router.put("/:id", upload.single("profile"), updateUser);
router.delete("/:id", deleteUser);
router.patch("/:id/ban", banUser);
router.get("/banned", getBannedUsers);
router.patch("/:id/unban", unbanUser);

module.exports = router;
