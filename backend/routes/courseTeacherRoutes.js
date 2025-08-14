const express = require('express');
const { register, login, list, get } = require('../controllers/courseTeacherController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', list);
router.get('/:id', get);

module.exports = router;
