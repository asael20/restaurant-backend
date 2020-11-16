const { client } = require('../../application/primary-ports/index');

class clientController {
    constructor() { }

    async signUp(req, res) {
        let { name, lastName, phone, userId, typeId, userType, email, password, restaurant } = req.body;
        let clientData = { name, lastName, phone, userId, typeId, userType, email, password };

        let result = await client.signUp(clientData, restaurant);
        res.json(result);
    }

    async singIn(req, res) {
        let {email, password, restaurantEmail} = req.body;

        let result = await client.singIn(email, password, restaurantEmail);
        res.json(result);
    }

    async buyDish(req, res) {
        let { dish, nutritionalValues,  } = req.body;
      
        let result = await client.buyDish(dish, nutritionalValues, req.token);
        res.json(result);
    }

    
}

module.exports = clientController;