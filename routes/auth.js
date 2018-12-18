var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var adminUserModel = require('../app/models/adminUser');
var StateMaster = require('../app/models/stateMaster');
//var jwt = require('jwt-simple');
var messageclass = require('../classes/messageClass');

var auth = {
    //////////////////////Start Admin Module///////////////////
    /*
     * Admin Sign Up
     */
    createlogin: function(req, res) {

        var adminUser = new adminUserModel({
            userName: 'admin',
            name: { first: "admin", last: 'admin' },
            mobile: '904123335',
            email: 'sumandeep@cdac.in',
            dob: { type: 1, value: '12/13/2018' },
            password: 'admin',
            address: {
                state: '5c10f7395fc72d18605390ff',
                district: '5c10f7395fc72d18605390ff',
                city: '5c10f7395fc72d18605390ff',
            },

        });

        adminUser.password = messageclass.SHAEncryption(adminUser.password);

        //  console.log(adminUser);
        adminUser.save(function(err, ss) {

            if (err) {
                return res.json({ success: true, databaseError: true, message: messageclass.errorMessage(err) });
            }
            //  console.log('User saved successfully');
            return res.json({ success: true, message: messageclass.insertMessage });
        });
    },
    /*
     * Admin Login
     */
    login: function(req, res) {
        //     console.log(req.body);
        // find the user
        adminUserModel.findOne({
            userName: req.body.userName,
            password: req.body.password
        }, function(err, user) {

            if (err) throw err;

            if (!user) {
                res.json({ status: true, success: false, message: 'Authentication failed. User not found.' });
            } else if (user) {

                // check if password matches
                //  console.log(user.password);
                if (user.password != req.body.password) {
                    res.json({ success: false, status: true, message: 'Authentication failed. Wrong password.' });
                } else {

                    // if user is found and password is right
                    // create a token
                    var payload = {
                        admin: user,
                        role: "admin"
                    }

                    var token = jwt.sign(messageclass.encrypt(payload), require('../config/secret')(), {
                        expiresIn: 86400 // expires in 24 hours
                    });

                    res.json({
                        status: true,
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                }

            }

        });

    },
    /*
     * Get Admin Profile
     */
    getadminuser: function(req, res) {
        console.log(req.body.id);
        adminUserModel.find({ '_id': req.body.id }, function(err, result) {
            if (err) {
                return res.json({ success: true, databaseError: true, message: messageclass.errorMessage(err) });

            } else if (result && result.length > 0) {

                res.json({
                    status: true,
                    success: true,
                    message: getMessage,
                    result: result
                });
            } else {
                res.json({
                    status: true,
                    success: false,
                    message: notfoundMessage,
                    result: result
                });
            }
        });


    },
    //////////////////////End Admin Module///////////////////////

}

module.exports = auth;