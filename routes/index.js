var express = require('express');
var router = express.Router();

var auth = require('./auth.js'); // Authentication 
var auth = require('./auth.js'); // Dashboard 

// Landing page for application
router.get('/', function(req, res, next) {
    res.send({ status: true, success: true, message: 'Cool!' });

});

/*
 * Admin Login
 */
router.post('/adminauthentication', auth.login);
/*
 * Admin SignUp
 */
router.get('/createlogin', auth.createlogin);
/*
 * Get Admin Profile
 */
router.post('/api/admin/getProfile', auth.getadminuser);

module.exports = router;