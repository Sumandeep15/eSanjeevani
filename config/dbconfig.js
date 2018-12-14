var db = require('mongoose');
db.Promise = global.Promise;
var promise = db.connect('mongodb://localhost:27017/eSanjeevani', {
    useMongoClient: true,
    /* other options */
});
promise.then(function(db) {
    //  console.log("connection",db)
    //* Use `db`, for instance `db.model()`

});
module.exports = db;