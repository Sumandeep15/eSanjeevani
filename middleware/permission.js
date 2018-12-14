// middleware for doing role-based permissions
module.exports = function permit(...allowed) {
    const isAllowed = role => allowed.indexOf(role) > -1;

    // return a middleware
    return (req, res, next) => {

        if (req.decoded && isAllowed(req.decoded.role))
            next(); // role is allowed, so continue on the next middleware
        else {
            res.status(403).json({ status: true, success: false, message: "You are not a authorized person to access this api." }); // user is forbidden
        }
    }
}