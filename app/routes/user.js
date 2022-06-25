const router = require('express').Router();

const userController = require("../controllers/userController");
const isAuthenticated = require('./../middlewares/auth'); 

router.post('/login', userController.login);
router.post('/register', userController.register);
router.get('/me', isAuthenticated, userController.me);
router.patch('/profile', isAuthenticated, userController.profile);
router.patch('/changePassword', isAuthenticated, userController.changePassword);

module.exports = router;
