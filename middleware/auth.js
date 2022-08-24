const config = require('config')
const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
const token = req.header ('x-auth-token') // header se token lia 
if(!token) return res.status(401).send('Access Denied! no token provided ')// agr token nh h to access denied

try {
    const decoded = jwt.verify(token, config.get('jwtPrivateKey')) // it returns payload
    req.user= decoded// user me decoded ko daal denge
    next();
} 
catch(ex) {
    res.status(400).send('Invalid token')
}
}

// module.exports = auth