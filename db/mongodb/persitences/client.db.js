const MongoConnection = require('../config/MongoConnection')
const objMongoConn = new MongoConnection();

class ClientPersistence {
    collectionName = 'clients';

    constructor(){
    
    }

    
    async save({name, lastName, phone, userId, typeId, userType, email, password, restaurant_ref}){
        let db = await objMongoConn.open();
        if(objMongoConn.error){
            return { error: true, type:'CONNECTION DB', reason:objMongoConn.message, data:null }
        }

        let collection = db.collection(this.collectionName);
        let result = await collection.insertOne({name, lastName, phone, userId, typeId, userType, email, password, restaurant_ref})
        
        return {ok:true, type:undefined, reason: undefined, data: result}
    }


    async saveFoodhistory(dish, nutritionalValues, email,  ) {
        let db = await objMongoConn.open();
        if(objMongoConn.error){
            return { error: true, type:'CONNECTION DB', reason:objMongoConn.message, data:null }
        }

        let collection = db.collection('foodHistrory');
        let today = new Date();
        let result = await collection.insertOne({dish, nutritionalValues, month:today.getMonth()+1, year:today.getFullYear(), email })

        return {ok:true, type:undefined, reason: undefined, data: result}
    }

    async getCount(email, password, restaurant_ref ){
        let db = await objMongoConn.open();
        if(objMongoConn.error){
            return { error: true, type:'CONNECTION DB', reason:objMongoConn.message, data:null }
        }

        let collection = db.collection(this.collectionName);
        let result = await collection.findOne({email, password, restaurant_ref},)
        console.log(result)
        return {ok:true, type:undefined, reason: undefined, data: result}
    }
}

module.exports = ClientPersistence;