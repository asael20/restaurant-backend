const Menu = require("./Menu")
const Dish = require("./Dish")
const { urlencoded } = require("express")
class Restaurant {

    menus = []

    constructor(name = '', address = '', user = '', nit = '', owner = '', urlimage='') {
        this.name = name
        this.address = address
        this.user = user
        this.nit = nit
        this.owner = owner
        this.image = urlimage
       
    }

    useDatabase(database) {
        this.db = database;
    }

    async getMenus() {
        let {data} = await this.db.restaurant.getMenus(this.user);
        return {data, ok:true, status:200};
    }

    async getAll() {
        let {data} = await this.db.restaurant.getAll();
        return {data, ok:true, status:200};
    }

}

module.exports = Restaurant;