class Dish {

    name = '';
    price = 0;
    ingredients = []
    nutritionalValues = {};
    description = ''
    
    constructor(name, description, price, ingredients, nutritionalValues, image=''){
        this.name = name;
        this.price = price;
        this.description = description
        this.ingredients = ingredients;
        this.nutritionalValues = nutritionalValues;
        this.image = image
    }

}


module.exports = Dish;