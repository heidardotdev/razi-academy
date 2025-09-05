const express = require("express");
const router = express.Router();
const userProfileController = require("../controllers/userProfileController");

router.post("/", userProfileController.uploadUserProfile);
router.get("/", userProfileController.getAllProfiles);
router.put("/:id", userProfileController.updateProfile);
router.delete("/:id", userProfileController.deleteProfile);

module.exports = router;
