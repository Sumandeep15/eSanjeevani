var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('../../config/dbconfig');
var validate = require('mongoose-validator');

var extend = require('mongoose-validator').extend
var validationclass = require('../../classes/validationClass');


var organizationMasterSchema = new Schema({
    name: {
        type: String,
        reuired: [true, "State Name is required."]
    },
    code: {
        type: String,

    }
}, { emitIndexErrors: true });

var OrganizationMaster = db.model('OrganizationMaster', organizationMasterSchema, 'OrganizationMaster');
module.exports = OrganizationMaster;