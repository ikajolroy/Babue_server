const jwt = require('jsonwebtoken');

exports.generateToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_KEY, {
        expiresIn: process.env.JWT_EXPIRATION
    })
}

