// =================================================================
// get the packages we need ========================================
// =================================================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
const csurf = require('csurf');
const cookieParser = require('cookie-parser');
var permit = require("./middleware/permission"); // middleware for checking if user's role is permitted to make request
var mailerClass = require('./classes/mailerClass');
const csrfMiddleware = csurf({
    cookie: true
});

var config = require('./config'); // get our config file
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// use morgan to log requests to the console
//app.use(morgan('dev'));
// if (app.get('env') == 'production') {
//     app.use(morgan('common', { skip: function(req, res) { return res.statusCode < 400 }, stream: __dirname + '/../morgan.log' }));
// } else {
//     app.use(morgan('dev'));
// }


// =================================================================
// routes ==========================================================
// =================================================================
app.all('/api/*', [require('./middleware/validaterequest')]);
app.use("/api/admin", permit("admin"));
app.use('/', require('./routes'));


// =================================================================
// CSRF middle ware ================================================
// =================================================================
app.use(cookieParser());
app.use(csrfMiddleware); //csrf middle ware
app.get('', (req, res) => {
    res.send(`
    <h1>Hello World</h1>
    <form action="/entry" method="POST">
      <div>
        <label for="message">Enter a message</label>
        <input id="message" name="message" type="text" />
      </div>
      <input type="submit" value="Submit" />
      <input type="text" name="_csrf" value="${req.csrfToken()}" />
    </form>
  `);
});


// ===============================================================================
// create a rolling file logger based on date/time that fires process events =====
// ===============================================================================
const opts = {
    errorEventName: 'error',
    logDirectory: './mylogfiles', // NOTE: folder must exist and be writable...
    fileNamePattern: 'roll-<DATE>.log',
    dateFormat: 'YYYY.MM.DD'
};
const log = require('simple-node-logger').createRollingFileLogger(opts);
//log.setLevel('error');

// =================================================================
// Handle 404 ======================================================
// =================================================================
app.use(function(req, res) {
    res.status(400);
    res.send({ status: false, success: false, message: '404: Not Found' });
    //  res.render('404.jade', { title: '404: File Not Found' });
});

// =================================================================
// Handle 500 ======================================================
// =================================================================
app.use(function(error, req, res, next) {
    res.status(error.status || 500);
    //write error logs
    log.info(error);
    log.info("                                                                                          ");
    log.info("------------------------------------------------------------------------------------------");
    log.info("                                                                                          ");

    //console.log(error);
    // var mailOptions = {
    //     from: 'support_phrms@cdac.in',
    //     to: 'summi15@gmail.com',
    //     subject: 'Error',
    //     text: "error"

    // };
    // mailerClass.sendMail(mailOptions);
    res.send({ status: false, success: false, message: error.message });

    //  res.render('500.jade', { title: '500: Internal Server Error', error: error });
});

// =================================================================
// start the server ================================================
// =================================================================

app.listen(port, "10.228.12.138");

//Sumandeep