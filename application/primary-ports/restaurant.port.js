const  Restaurant = require( '../../domain/Restaurant');
const database = require('../../db/mongodb/index')

async function listMenus(restaurantEmail){
    let restaurant = new Restaurant();
    restaurant.useDatabase(database);
    restaurant.user = restaurantEmail;
    
    let result = await restaurant.getMenus()
    
    return result;
}


async function getAll(){
    let restaurant = new Restaurant();
    restaurant.useDatabase(database);
   
    let result = await restaurant.getAll()
    
    return result;
}

const clientPort = {
    listMenus,
    getAll
}

module.exports = clientPort

