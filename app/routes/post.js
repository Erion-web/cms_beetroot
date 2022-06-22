const router = require('express').Router();

const postController = require('../controllers/postController');
const isAuthenticated = require('./../middlewares/auth');

router.get('/', postController.all);
router.post('/:slug/like', isAuthenticated, postController.like);
router.post('/:slug/favorite', isAuthenticated, postController.favorite);
router.post('/:slug/comment', isAuthenticated, postController.comment);
router.post('/create', isAuthenticated, postController.create);
router.put('/:id/edit', isAuthenticated, postController.update);
router.delete('/:id/delete', isAuthenticated, postController.deletePost);

module.exports = router;
