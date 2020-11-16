const { restaurant } = require('../../application/primary-ports/index');

class RestaurantController {
    constructor() { }

    async lisMenus(req, res) {
        let  {email} = req.params;

        let result = await restaurant.listMenus(email);
        res.json(result)
    }

    async getAll(req, res) {
        res.json(await restaurant.getAll())
    }


    

    
}

module.exports = RestaurantController;