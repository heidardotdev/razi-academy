const express = require("express");
const router = express.Router();
const {
  upload,
  uploadPresentationCover,
  getAllPresentationCovers,
  updatePresentationCover,
  deletePresentationCover
} = require("../controllers/presentationCoverController");

router.post("/", upload.single("cover"), uploadPresentationCover);
router.get("/", getAllPresentationCovers);
router.put("/:id", upload.single("cover"), updatePresentationCover);
router.delete("/:id", deletePresentationCover);

module.exports = router;
