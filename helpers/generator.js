const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModels')

exports.generateToken = (username) => {
    return jwt.sign({ username }, process.env.JWT_KEY, {
        expiresIn: process.env.JWT_EXPIRATION
    })
}


// Generate English Name to Username
exports.generateENG2Username = async (username) => {

    let x = false
    do {
        const user = await UserModel.findOne({ username })
        if (user) {
            username = username + "." + Math.random().toString(30).slice(3, 8)
            x = true
        } else {
            x = false
        }
    } while (x)

    return username
}


// Generate Other Language to English username
exports.randomAlphabetName = async () => {
    let x = false
    let username = Math.random().toString(30).slice(3, 12)
    do {
        const user = await UserModel.findOne({ username })
        if (user) {
            x = true
            username = username + "." + Math.random().toString(30).slice(3, 7)
        } else {
            x = false
        }
    } while (x)
    return username
}