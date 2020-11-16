'use stric';
class User {
   

    name = '';
    lastName = '';
    phone = '';
    userId = ''
    typeId = '';
    userType = 0;
    email = '';
    password = '';
    
    fromJSON({name, lastName, phone, userId, typeId, userType, email, password}){
        this.name = name
        this.lastName = lastName
        this.phone = phone
        this.typeId = typeId
        this.userType = userType
        this.email = email,
        this.password = password
        this.userId = userId
        return this
    }

}   

module.exports = User;