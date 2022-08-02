const router = require('express').Router();
const controllers = require('../controllers/items')
const auth = require('../middleware/auth')

router.get('*',auth.checkuser);
router.get('/',auth.checking,controllers.homepage);
router.get('/signup',controllers.signup_get)
router.post('/signup',controllers.signup_post)
router.get('/login',controllers.login_get)
router.post('/login',controllers.login_post)
router.get('/logout',controllers.logout)



module.exports = router;    