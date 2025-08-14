const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/courseController');

router.get('/', ctrl.getAllCourses);
router.get('/popular', ctrl.getPopularCourses);
router.get('/:id', ctrl.getCourseDetails);
router.post('/', ctrl.createCourse);
router.put('/:id', ctrl.updateCourse);
router.delete('/:id', ctrl.deleteCourse);
router.post('/:id/join', ctrl.joinCourse);

module.exports = router;
