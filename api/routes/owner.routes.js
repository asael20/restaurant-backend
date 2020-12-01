const router = require('express').Router();
const { verifyToken } = require('../middlewares/authentication')
const OwnerController = require('../controllers/owner.controller')
const ownerController = new OwnerController();
const multer = require('multer');
const { verify } = require('jsonwebtoken');
const uploads = multer({dest:'uploads'})

// GET METHOD

router.get('/owner/:id/myrestaurants', verifyToken, ownerController.getMyRestaurants);


// POST METHODS
router.post('/owner/signin', ownerController.singIn);
router.post('/owner/signup', uploads.single('image'), ownerController.signUp);
router.post('/owner/restaurant/menu/create', verifyToken, ownerController.createMenu);
router.post('/owner/restaurant/menu/dish/create', verifyToken, uploads.single('image'), ownerController.addDishToMenu);


module.exports = router;