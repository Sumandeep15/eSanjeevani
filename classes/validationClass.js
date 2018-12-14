var validate = require('mongoose-validator');
var extend = require('mongoose-validator').extend;

extend(
    'isString',
    function(val) {
        return Object.prototype.toString.call(val) === '[object String]'
    },
    'Not a string'
)

function nameValidator(fieldName) {
    return [
        validate({
            validator: 'isLength',
            arguments: [3, 50],
            message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters',
        }),
        validate({
            validator: 'isAlphanumeric',
            passIfEmpty: true,
            message: 'Name should contain alpha-numeric characters only',
        }),
    ]
}

function positiveNumber(fieldName) {
    return validate({
        validator: function(val) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(val > 0)
                }, 500)
            })
        },
        message: fieldName + ' must be a positive number.',
    });
}

function string(fieldName) {
    return validate({
        validator: 'isString',
        message: fieldName + ' not a valid string',
    });
}


module.exports = {
    nameValidator: nameValidator,
    positiveNumber: positiveNumber,
    string: string,

};