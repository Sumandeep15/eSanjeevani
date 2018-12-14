var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('../../config/dbconfig');
var validate = require('mongoose-validator');

var extend = require('mongoose-validator').extend
var validationclass = require('../../classes/validationClass');


var AdminUserSchema = new Schema({
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


// AdminUserSchema.methods.comparePassword = function(password) {

//     return bcrypt.compareSync(password, this.password);
// };

// schema.post('pre', prehandleE11000);
// schema.post('save', handleE11000);
// schema.post('update', handleE11000);
// schema.post('findOneAndUpdate', handleE11000);
// schema.post('insertMany', handleE11000);
var AdminUser = db.model('AdminUser', AdminUserSchema, 'AdminUser');
module.exports = AdminUser;