const express = require('express');
const commentController = require('../controllers/CommentController');
const { protect } = require('../middlewares/auth');
const { validateRequest } = require('../middlewares/validate');
const { commentValidator } = require('../validators/comment.validator');

const router = express.Router();

router.post('/', protect, commentValidator, validateRequest, commentController.addComment);
router.get('/:articleId', commentController.getCommentsByArticleId);
router.delete('/:id', protect, commentController.deleteComment);

module.exports = router;
