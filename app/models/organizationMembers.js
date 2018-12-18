var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('../../config/dbconfig');
var validate = require('mongoose-validator');

var extend = require('mongoose-validator').extend
var validationclass = require('../../classes/validationClass');


var organizationMembersSchema = new Schema({
    name: {
        first: {
            type: String,
            reuired: [true, "First Name is required."]
        },
        middle: {
            type: String,

        },
        last: {
            type: String,
            reuired: [true, "Last Name is required."]
        }
    },
    type: {
        type: Schema.Types.ObjectId,
        ref: 'MemberType',
        required: [true, 'State is required']
    },
    mobile: {
        type: Number,
        unique: true

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


    },
    dob: {
        type: {
            type: Number,
        },
        value: {
            type: String,
        }
    },
    password: { type: String, required: true },
    userName: {
        type: String,
        required: [true, 'User Name is required'],
        unique: true
    }

}, { emitIndexErrors: true });


var OrganizationMembersSchema = db.model('OrganizationMembersSchema', organizationMembersSchema, 'OrganizationMembersSchema');
module.exports = OrganizationMembersSchema;