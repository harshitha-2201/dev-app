const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    try {
        let token = req.header('x-Token');
        if (!token) {
            return res.status(400).send('Token not found');
        }
        console.log(token)
        let decode = jwt.verify(token, 'jwtPassword'); // Extract token from "Bearer <token>" format
        req.user = decode.user;
        next(); // Call next() to proceed to the next middleware or route handler
    } catch (err) {
        console.log(err);
        return res.status(401).send('Authentication error'); // Changed status code to 401 for unauthorized
    }
};
