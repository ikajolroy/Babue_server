const userModels = require('../models/userModels');
const adminModels = require('../models/adminModel');
const CryptoJs = require('crypto-js');
const Jwt = require('jsonwebtoken');

exports.guardOfUser = async (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {

        try {
            // Decrypt Password
            const encrypted = req.headers.authorization.split(' ')[1];
            const bytes = CryptoJs.AES.decrypt(encrypted, process.env.ENCRYPT_KEY);
            const token = bytes.toString(CryptoJs.enc.Utf8)
            const decode = Jwt.verify(token, process.env.JWT_KEY)

            // Find exact authenticate user
            const user = await userModels.findById(decode._id)
            if (user) {
                req.user = user;
                next()
            } else {
                return res.status(400).send({redirect:true, message: "Login expire please login agin !" })
            }
        } catch (error) {
            return res.status(400).send({ message: error.message })
        }
    } else {
        res.status(400).send({ message: "Please login to access !" })
    }
}

//admin guard
exports.guardOfAdmin=async (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {

        try {
            // Decrypt Password
            const encrypted = req.headers.authorization.split(' ')[1];
            const bytes = CryptoJs.AES.decrypt(encrypted, process.env.ENCRYPT_KEY);
            const token = bytes.toString(CryptoJs.enc.Utf8)
            const decode = Jwt.verify(token, process.env.JWT_KEY)

            // Find exact authenticate user
            const admin = await adminModels.findById(decode._id)
            if (admin) {
                req.admin = admin;
                next()
            } else {
                return res.status(400).send({ message: "Your are not allowed to access this !" })
            }
        } catch (error) {
            return res.status(400).send({ message: error.message })
        }
    } else {
        res.status(400).send({ message: "Please login to access !" })
    }
}
