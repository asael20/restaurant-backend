const router = require('express').Router();
const { verifyToken } = require('../middlewares/authentication')
const OwnerController = require('../controllers/owner.controller')
const ownerController = new OwnerController();
const multer = require('multer')
const uploads = multer({dest:'uploads'})




// POST METHODS
router.post('/owner/signin', ownerController.singIn);
router.post('/owner/signup', uploads.single('image'), ownerController.signUp);
router.post('/owner/restaurant/menu/create', verifyToken, ownerController.createMenu);
router.post('/owner/restaurant/menu/dish/create', verifyToken, ownerController.addDishToMenu);


module.exports = router;