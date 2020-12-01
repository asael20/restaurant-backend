const jwt = require('jsonwebtoken')
const { generateToken, verifyToken } = require('./common.utils')
const User = require("./User");
const Restaurant = require('./Restaurant');
const Menu = require("./Menu");
const Dish = require("./Dish");

class Owner extends User {
    constructor(database) {
        super()
        this.db = database
    }


    async register() {
        let result = await this.db.owner.save(this);
        let payload = { email: this.email, password: this.password }
        if (result.error) return { ok: false, status: 505, mesage: 'something was wrong save owner in BD' };

        let token = generateToken(payload);

        return { ok: true, status: 200, token };
    }

    async registerRestaurant(restaurantName, address, user, nit, urlimage) {

        let restaurant = new Restaurant(restaurantName, address, user, nit, this.userId, urlimage);
        let result = await this.db.owner.saveRestaurant(restaurant);

        if (result.error) return { ok: false, status: 505, message: 'something was wrong save restaurant in BD' };
        else return { ok: true, status: 200, message: 'restaurant registered' }
    }

    async createMenu(title, description, restaurant, token) {

        let { isvalid, values, reason } = verifyToken(token);

        if (!isvalid) return { ok: false, status: 403, message: reason };

        let menu = new Menu().fill(title, description, restaurant);
        let result = await this.db.owner.saveMenu(menu);

        if (result.error) return { ok: false, status: 505, message: 'something was wrong save restaurant in BD' };

        return { ok: true, status: 200, message: 'menu saved successfully' };
    }

    async addDish(name, description, price, ingredients, nutritionalValues, restaurant, menuTitle, token, urlimage) {
        let { isvalid, values, reason } = verifyToken(token)

        if (!isvalid) return { ok: false, status: 403, message: reason };

        let dish = new Dish(name, description, price, ingredients, nutritionalValues, urlimage);
        let menu = new Menu(this.db).fill(menuTitle, '', restaurant);

        return await menu.putDish(dish);
    }


    async login() {
        let result = await this.db.owner.getCount(this.email, this.password);

        if (!result.ok) return { ok: false, status: 505, message: result.reason };

        if (result.data == null) return { ok: false, status: 404, message: 'credenciales erroneas' };

        let payload = { email: this.email, password: this.password };
        let token = generateToken(payload);

        return { ok: true, status: 200, data: result.data, message: '', token };
    }

    async getMyRestaurants(id, token) {

        let { isvalid, values, reason } = verifyToken(token)

        if (!isvalid) return { ok: false, status: 403, message: reason };

        let result = await this.db.owner.getRestaurantByOwner(id);
        let data = result.data
        if (!result.ok) {
            return { ok: false, status: 505, message: result.reason };
        }

        let objRestaurant = new Restaurant('', '', data.user);
        objRestaurant.useDatabase(this.db);
        let { data: menus, ok } = await objRestaurant.getMenus();

        return { ok:true, status:200, data:{menus, restaurant:data} };
    }





}

module.exports = Owner;