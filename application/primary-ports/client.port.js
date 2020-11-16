const  Client = require( '../../domain/Client');
const database = require('../../db/mongodb/index');

async function signUp({name, lastName, phone, userId, typeId, userType, email, password }, restaurant){
    let client = new Client(database).fromJSON({name, lastName, phone, userId, typeId, userType, email, password});
    client.restaurant_ref = restaurant;
    let result = await client.register();

    return result;
}

async function singIn(email, password, restaurantEmail){
    let client = new Client(database)
    client.email = email;
    client.password = password
    client.restaurant_ref = restaurantEmail;
    
    let result = await client.login();

    return result;
}


async function buyDish(dish, nutritionalValues, token){
    let client = new Client(database);
    let result = await client.buyDish(dish, nutritionalValues, token);

    if(!result.ok) return result;
    

    return result;
}

const clientPort = {
   signUp,
   buyDish,
   singIn
}

module.exports = clientPort


