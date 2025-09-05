const express = require('express');
const router = express.Router();
const {
  uploadArticleCover,
  getAllArticleCovers,
  updateArticleCover,
  deleteArticleCover
} = require('../controllers/articleCoverController');

router.post('/', uploadArticleCover);
router.get('/', getAllArticleCovers);
router.put('/:id', updateArticleCover);
router.delete('/:id', deleteArticleCover);

module.exports = router;
