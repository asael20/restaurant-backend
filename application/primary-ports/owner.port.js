const  Owner = require( '../../domain/Owner');
const database = require('../../db/mongodb/index')
const fs = require('fs')
const path = require('path');

async function signUp({ownerName:name, lastName, phone, userId, typeId, userType, email, password }, {address, user, nit, restaurantName}, file){
    
    let owner = new Owner(database).fromJSON({name, lastName, phone, userId, typeId, userType, email, password});
    console.log(file)
    let result = await owner.register();
    if(!result.ok) return result;
    
    fs.createReadStream(file.path).pipe(fs.createWriteStream(`public/images/restaurants/${user}${path.extname(file.originalname)}`));
    let urlimage = `${global.URL_IMAGES}/restaurants/${user}${path.extname(file.originalname)}`;
   
    await owner.registerRestaurant(restaurantName, address, user, nit, urlimage);
    
    return result;
}

async function createMenu(title, description, restaurant, token) {
    let owner = new Owner(database);
    return await owner.createMenu(title, description, restaurant, token);
}

async function addDishtoMenu(name, description, price, ingredients, nutritionalValues, restaurant, menuTitle, token) {
    let owner = new Owner(database);
    return await owner.addDish(name, description, price, ingredients, nutritionalValues, restaurant, menuTitle, token)
}

async function singIn(email, password){
    let owner = new Owner(database)
    owner.email = email;
    owner.password = password
    
    let result = await owner.login();

    return result;
}



const ownerPort = {
   signUp,
   singIn,
   createMenu,
   addDishtoMenu
}

module.exports = ownerPort


