const express = require('express');
const articleController = require('../controllers/ArticleController');
const { protect } = require('../middlewares/auth');
const { authorize } = require('../middlewares/role');
const { validateRequest } = require('../middlewares/validate');
const { articleValidator } = require('../validators/article.validator');

const router = express.Router();

router.post('/', protect, authorize('author', 'admin'), articleValidator, validateRequest, articleController.createArticle);
router.get('/', articleController.getArticles);
router.get('/search', articleController.searchArticles);
router.get('/trending', articleController.getTrendingArticles);
router.get('/category/:categoryId', articleController.getArticlesByCategory);
router.get('/:id', articleController.getArticleById);
router.put('/:id', protect, authorize('author', 'admin'), articleController.updateArticle);
router.delete('/:id', protect, authorize('author', 'admin'), articleController.deleteArticle);

module.exports = router;
