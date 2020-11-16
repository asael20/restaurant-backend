const router = require('express').Router();
const { verifyToken } = require('../middlewares/authentication')
const RestaurantController = require('../controllers/restaurant.controller')
const restaurantController = new RestaurantController();


// GET METHODS
router.get('/restaurant/:email/menus/list', restaurantController.lisMenus);
router.get('/restaurants', restaurantController.getAll)
module.exports = router;