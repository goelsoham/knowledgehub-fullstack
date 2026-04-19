const express = require('express');
const bookmarkController = require('../controllers/BookmarkController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.post('/', protect, bookmarkController.addBookmark);
router.delete('/:id', protect, bookmarkController.removeBookmark);
router.get('/user/:userId', protect, bookmarkController.getUserBookmarks);

module.exports = router;
