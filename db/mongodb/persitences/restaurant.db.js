const MongoConnection = require('../config/MongoConnection')
const objMongoConn = new MongoConnection();

class RestaurantPersistence {
    collectionName = 'restaurants';

    constructor() {

    }

    async getMenus(restaurant) {

        let db = await objMongoConn.open();
        if (objMongoConn.error) {
            return { error: true, type: 'CONNECTION DB', reason: objMongoConn.message, data: null }
        }
        
        let result = [];
        let collection = db.collection('menus');
        let cursor = await collection.find({restaurant})
     
        if (await cursor.count() > 0) {
            await cursor.forEach((doc) => {
                result.push(doc);
                
            })
        }
    
        return { ok: true, type: undefined, reason: undefined, data: result }
    }

    async getAll() {
        let db = await objMongoConn.open();
        if (objMongoConn.error) {
            return { error: true, type: 'CONNECTION DB', reason: objMongoConn.message, data: null }
        }
        
        let restaurants = [];
        let collection = db.collection(this.collectionName);
        let cursor = await collection.find()
     
        if (await cursor.count() > 0) {
            await cursor.forEach((doc) => {
                restaurants.push(doc);
                
            })
        }
    
        return { ok: true, type: undefined, reason: undefined, data: restaurants }
    }

}

module.exports = RestaurantPersistence;

