var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: 'smtp.cdac.in',
    port: 587,
    //secure: false, // upgrade later with STARTTLS
    auth: {
        user: 'support_phrms@cdac.in',
        pass: 'sr89bPNc'
    },
    tls: { rejectUnauthorized: false }
});



function sendMail(mailOptions) {
    console.log(mailOptions)
    transporter.sendMail(mailOptions, function(err, info) {
        //  console.log("sumandeep");
        //  console.log(err)
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
module.exports = {
    sendMail: sendMail,

};