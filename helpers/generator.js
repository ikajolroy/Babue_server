const jwt = require('jsonwebtoken');

exports.generateToken = (_id) => {
    return jwt.sign({ _id }, process.env.ENCRYPT_KEY, {
        expiresIn: process.env.JWT_EXPIRATION||"90d"
    })
}

