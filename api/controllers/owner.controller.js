const { owner } = require('../../application/primary-ports/index');

class OwnerController {
    constructor() { }

    async signUp(req, res) {
        let { ownerName, lastName, phone, userId, typeId, userType, email, password } = req.body;
        let  {address, user, nit, restaurantName} = req.body;

        let ownerData = { ownerName, lastName, phone, userId, typeId, userType, email, password };
        let restaurantData = {address, user, nit, restaurantName};

        let result = await owner.signUp(ownerData, restaurantData, req.file);
        res.json(result);
    }

    async singIn(req, res) {
        let {email, password} = req.body;
        console.log(req.body)
        let result = await owner.singIn(email, password);
        res.json(result);
    }


    async createMenu(req, res){
        let  { title, description, restaurant } = req.body, token = req.token;

        let result = await owner.createMenu(title, description, restaurant, token);
        res.json(result);
    }

    async addDishToMenu(req, res) {
        let  { name, description, price, ingredients, nutritionalValues, restaurant, menuTitle } = req.body;

        let result = await owner.addDishtoMenu(name, description, price, ingredients, nutritionalValues, restaurant, menuTitle, req.token);
        res.json(result)
    }


}

module.exports = OwnerController;