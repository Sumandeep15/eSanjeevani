var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('../../config/dbconfig');
var validate = require('mongoose-validator');

var extend = require('mongoose-validator').extend
var validationclass = require('../../classes/validationClass');


var memberTypeSchema = new Schema({
    name: {
        type: String,
        reuired: [true, "State Name is required."]
    },
    code: {
        type: Number,
        unique: true
    }
}, { emitIndexErrors: true });

var MemberType = db.model('MemberType', memberTypeSchema, 'MemberType');
module.exports = MemberType;