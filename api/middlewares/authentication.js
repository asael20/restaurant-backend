module.exports.
    verifyToken = function (req, res, next) {
        let auth = req.headers['authorization']
        if (auth) {
            req.token = auth.split(' ')[1];
            next()
            return
        }

        res.status(403).json({ ok: false, message: 'you hav not been authorizated' })
    }