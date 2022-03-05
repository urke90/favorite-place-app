const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');

exports.checkAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            throw new Error('Authentication failed!');
        }
        const decodedToken = jwt.verify(token, 'supersecret_dont_share');

        req.userData = { userId: decodedToken.userId };
        next();
    } catch (err) {
        return next(new HttpError('Authentiaction failed!', 401));
    }
};
