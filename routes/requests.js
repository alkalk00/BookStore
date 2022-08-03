const router = require('express').Router();
const controllers = require('../controllers/userAuth')
const auth = require('../middleware/auth')
const userController = require('../controllers/user')

router.get('*',auth.checkuser);
router.get('/',auth.checking,controllers.homepage);
router.get('/reminders/:id',auth.checking,userController.reminders);
router.get('/signup',controllers.signup_get)
router.post('/signup',controllers.signup_post)
router.get('/login',controllers.login_get)
router.post('/login',controllers.login_post)
router.get('/logout',controllers.logout)



module.exports = router;