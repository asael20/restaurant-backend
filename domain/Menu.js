class Menu {
    
    title = '' 
    description = '' 
    restaurant = ''

    dishes = []

    constructor(database){
        this.db = database;
    }


    fill(title, description, restaurant){
        this.title = title
        this.description = description
        this.restaurant = restaurant

        return this;
    }

    async putDish(dish){
        let result = await this.db.menu.putDish(dish, this.title,  this.restaurant);
        if(result.error) return {ok:false, message:'COULD NOT PUT THIS DISH, ERR BD', status:505}

        return {ok:true, message:'Dish was puted successfully', status:200}        
    }


}

module.exports = Menu;