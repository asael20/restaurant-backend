const MongoConnection = require('../config/MongoConnection')
const objMongoConn = new MongoConnection();

class OwnerPersistence {
    collectionName = 'owners';

    constructor(){
    
    }

    
    async save({name, lastName, phone, userId, typeId, userType, email, password}){
        let db = await objMongoConn.open();
        if(objMongoConn.error){
            return { error: true, type:'CONNECTION DB', reason:objMongoConn.message, data:null }
        }

        let collection = db.collection(this.collectionName);
        let result = await collection.insertOne({name, lastName, phone, userId, typeId, userType, email, password})
        
        return {ok:true, type:undefined, reason: undefined, data: result}
    }


    async saveRestaurant({name, address, user, nit, owner, image}) {
        let db = await objMongoConn.open();
        if(objMongoConn.error){
            return { error: true, type:'CONNECTION DB', reason:objMongoConn.message, data:null }
        }

        let collection = db.collection('restaurants');
        let result = await collection.insertOne({name, address, user, nit, owner, image})
        
        return {ok:true, type:undefined, reason: undefined, data: result};
    }

    async saveMenu(menu) {
        let db = await objMongoConn.open();
        if(objMongoConn.error){
            return { error: true, type:'CONNECTION DB', reason:objMongoConn.message, data:null }
        }

        let collection = db.collection('menus');
        let result = await collection.insertOne(menu)
        
        return {ok:true, type:undefined, reason: undefined, data: result}
    }


    async getCount(email, password ){
        let db = await objMongoConn.open();
        if(objMongoConn.error){
            return { error: true, type:'CONNECTION DB', reason:objMongoConn.message, data:null }
        }

        let collection = db.collection(this.collectionName);
        let result = await collection.findOne({email, password},);
        console.log(result)
        return {ok:true, type:undefined, reason: undefined, data: result}
    }

}

module.exports = OwnerPersistence;