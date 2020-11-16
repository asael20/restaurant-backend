const MongoConnection = require('../config/MongoConnection')
const objMongoConn = new MongoConnection();

class MenuPersistence {
    collectionName = 'menus';

    constructor(){
    
    }

    
    async putDish(dish, title, restaurant){
        let db = await objMongoConn.open();
        if(objMongoConn.error) return { error: true, type:'CONNECTION DB', reason:objMongoConn.message, data:null }  
        let collection = db.collection(this.collectionName);

        let dbResponse = await collection.updateOne({title, restaurant}, {$push:{ dishes: dish }})
        console.log(dbResponse.result)
        
        return {ok:true, type:undefined, reason: undefined, data: dbResponse.result}
    }


  

}

module.exports = MenuPersistence;