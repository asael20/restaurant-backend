const router = require('express').Router();
const { verifyToken } = require('../middlewares/authentication')
const ClientController = require('../controllers/client.controller')
const clientController = new ClientController();


// GET METHODS




// POST METHODS
router.post('/client/login', clientController.singIn)
router.post('/client/signup', clientController.signUp);
router.post('/client/dish/buy', verifyToken,clientController.buyDish);


module.exports = router;