const ConnectionDB = require("../../Connection");
const { MongoClient } = require('mongodb')
const { CONFIG_CONNECTION_MONGO } = require('./config-connection');

class MongoConnection extends ConnectionDB{
    uri = `mongodb://localhost:27017`
    constructor(configd){
        super()
       this.connection = new MongoClient(this.uri, { useUnifiedTopology: true });
    }

    async open(){ 
        
        try {
            await this.connection.connect();
            const database = this.connection.db('restaurants-tracker');
            console.log('connected...')
            return database;
        } catch (error) {
            console.log('IT WAS AN EEROR TRYING TO CONNECT DB...', error);
            this.error = true;
            this.message = error;
            
            return null
        }
    }

}

module.exports = MongoConnection;