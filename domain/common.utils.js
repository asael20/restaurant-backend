const jwt = require('jsonwebtoken');

module.exports.generateToken = function(payload) {
    let token = null;
    try {
        token = jwt.sign(payload, process.env.SECRET, {expiresIn:`${5/60}h`})
    } catch (error) {
        console.error('ERORO CODING TOKEN ', error)
    }

    return token;
}

module.exports.verifyToken = function(token) {
    let result = null;
    try {
        values = jwt.verify(token, process.env.SECRET);
        result = {isvalid:true, values }

    } catch (error) {
        console.error('ERORO CODING TOKEN ', error)
        result = {isvalid:false, values:null, reason:error}
    }

    return result;
}