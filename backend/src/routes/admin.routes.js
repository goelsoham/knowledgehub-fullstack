const express = require('express');
const adminController = require('../controllers/AdminController');
const { protect } = require('../middlewares/auth');
const { authorize } = require('../middlewares/role');

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.get('/users', adminController.getAllUsers);
router.delete('/user/:id', adminController.deleteUser);
router.get('/pending-articles', adminController.getPendingArticles);
router.put('/approve/:id', adminController.approveArticle);
router.put('/reject/:id', adminController.rejectArticle);

module.exports = router;
