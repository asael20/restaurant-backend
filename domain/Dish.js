class Dish {

    name = '';
    price = 0;
    ingredients = []
    nutritionalValues = {};
    description = ''
    
    constructor(name, description, price, ingredients, nutritionalValues){
        this.name = name;
        this.price = price;
        this.description = description
        this.ingredients = ingredients;
        this.nutritionalValues = nutritionalValues
    }

}


module.exports = Dish;