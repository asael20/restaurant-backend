const { generateToken, verifyToken } = require("./common.utils");
const Dish = require("./Dish");
const User = require("./User");

class Client extends User {
    
    restaurant_ref = '';

    constructor(database){
        super()
        this.db = database
    }    

    async register(){
        let result = await this.db.client.save(this);
        if(!result.ok) return {ok:false, status:505, message:result.reason};
        let payload = {email: this.email, password: this.password, restaurant:this.restaurant_ref};
        let token = generateToken(payload);

        return {ok:true, status:200, message:'client saved successfully', token};
    }

    async login(){
        let result = await this.db.client.getCount(this.email, this.password, this.restaurant_ref );

        if(!result.ok) return {ok:false, status:505, message:result.reason};
        
        if(result.data == null) return {ok:false, status:404, message:'credenciales erroneas'};

        let payload = {email: this.email, password: this.password, restaurant:this.restaurant_ref};
        let token = generateToken(payload);

        return {ok:true, status:200, data:result.data, message:'', token};
    }

    async buyDish(dish, nutritionalValues, token) {
        let {isvalid, values, reason} = verifyToken(token);
        if(!isvalid) return {ok:false, message:reason, status:505}
        
        let res = await this.db.client.saveFoodhistory(dish, nutritionalValues,  values.email);
        
        return {ok:true, status:200, message:'dish bought successfully'};;
    }
        
    async analyzeMonth(){

    }


    
}


module.exports = Client;