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
    type: {
        type: Schema.Types.ObjectId,
        ref: 'OrganizationType',
        required: [true, 'State is required']
    },

    mobile: {
        type: Number,
        unique: true
            // required: [true, 'Mobile Number Required.']
    },
    email: {
        type: String,
        unique: true
    },
    address: {
        state: {
            type: Schema.Types.ObjectId,
            ref: 'StateMaster',
            required: [true, 'State is required']
        },
        district: {
            type: Schema.Types.ObjectId,
            ref: 'DistrictMaster',
            required: [true, 'District is required']
        },
        city: {
            type: Schema.Types.ObjectId,
            ref: 'CityMaster',
            required: [true, 'City is required']
        },
        adressLine1: {
            type: String,

        },
        adressLine2: {
            type: String,

        }


    }
}, { emitIndexErrors: true });

var OrganizationMaster = db.model('OrganizationMaster', organizationMasterSchema, 'OrganizationMaster');
module.exports = OrganizationMaster;