var jwt = require('jsonwebtoken');
var validateUser = require('../routes/auth').validateUser;
var messageclass = require('../classes/messageClass');
module.exports = function(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.param('token') || req.headers['x-access-token'];
    // console.log(token);
    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(messageclass.decrypt(token), require('../config/secret')(), function(err, decoded) {

            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {

                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                // console.log("121212")
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
};