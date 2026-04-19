const express = require('express');

const authRoutes = require('./auth.routes');
const articleRoutes = require('./article.routes');
const commentRoutes = require('./comment.routes');
const bookmarkRoutes = require('./bookmark.routes');
const adminRoutes = require('./admin.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/articles', articleRoutes);
router.use('/comments', commentRoutes);
router.use('/bookmarks', bookmarkRoutes);
router.use('/admin', adminRoutes);

router.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

module.exports = router;
