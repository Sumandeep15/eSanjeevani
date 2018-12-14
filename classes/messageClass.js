const bcrypt = require('bcrypt');
const saltRounds = 10;
var salt = bcrypt.genSaltSync(saltRounds);

function errorMessage(error) {
    if (error.name === 'MongoError' && error.code === 11000) {

        return "Duplicate" + (error.message.split('index:')[1].split('_')[0]) + " not allowed."; //'There was a duplicate key error';
    } else if (error.errors) {

        for (var key in error.errors) {
            var value = error.errors[key].message;
            return value;
        }
    } else {
        console.log(error);
        return "Something went wrong";
    }
}

var b = function() {
    return 'start';
}

function convertHash(plaintext) {
    return bcrypt.hashSync(plaintext, salt);
}

var encrypt = function(text) {
    var cipher = crypto.createCipher('AES-256-CBC', passPhrase);
    var crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}
var decrypt = function(text) {
    var decipher = crypto.createDecipher('AES-256-CBC', passPhrase)
    var dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
}
global.insertMessage = 'Saved successfully!';

global.getMessage = 'Retrive data successfully!';

global.updateMessage = 'Update successfully!';

global.deleteMessage = 'Delete successfully!';

global.notfoundMessage = 'Record not found.';

global.getMessage = 'Retrive data successfully!';
module.exports = {
    errorMessage: errorMessage,
    b: b,
    convertHash: convertHash,
    encrypt: encrypt,
    decrypt: decrypt,

};