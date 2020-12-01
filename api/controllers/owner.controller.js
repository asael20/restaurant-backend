const { owner } = require('../../application/primary-ports/index');
const fs = require('fs')

class OwnerController {
    constructor() { }

    async signUp(req, res) {
        let { ownerName, lastName, phone, userId, typeId, userType, email, password } = req.body;
        let  {address, user, nit, restaurantName} = req.body;

        let ownerData = { ownerName, lastName, phone, userId, typeId, userType, email, password };
        let restaurantData = {address, user, nit, restaurantName};

        let result = await owner.signUp(ownerData, restaurantData, req.file);
        fs.unlink(req.file.path, ()=>{
            console.log('image cleaned')
        })
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
        let  { name, description, price, ingredients, restaurant, menuTitle, proteina, fibra, azucar, grasa_saturada, grasa_poliinsaturada, grasa_monoinsaturada } = req.body;
        let nutritionalValues = {proteina, fibra, azucar, grasa_saturada, grasa_poliinsaturada, grasa_monoinsaturada}
        
        console.log(req.body)
        let result = await owner.addDishtoMenu(name, description, price, ingredients, nutritionalValues, restaurant, menuTitle, req.token, req.file);
        fs.unlink(req.file.path, ()=>{
            console.log('image cleaned')
        })
        res.json(result)
    }

    async getMyRestaurants(req, res){
       let {id} = req.params;

       let result = await owner.getMyRestaurant(id, req.token)
        res.json(result)
    }


}

module.exports = OwnerController;