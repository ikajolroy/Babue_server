const userModels = require('../models/userModels');
const bcrypt = require("bcrypt");
const { checkAlphabet, validPhone } = require('../helpers/validator');
const { generateENG2Username, randomAlphabetName, generateToken } = require('../helpers/generator');
const CryptoJs = require('crypto-js');


// User Auth Registration
exports.userRegister = async (req, res) => {
    try {
        const { firstName, lastName, phone, password, image, gender, dateOfBirth } = req.body;
        if (!firstName || !lastName || !phone || !image || !gender || !dateOfBirth || !password) {
            return res.status(404).send({ message: "Invalid user information." });
        }
        const user = await userModels.findOne({ phone })
        if (user) return res.status(200).send({ message: " Username already registered !" });
        if (!validPhone(phone.toString())) return res.status(404).send({ message: "Invalid phone number !" });
        if (checkAlphabet(firstName + lastName)) {
            const username = await generateENG2Username(firstName + "." + lastName)
            const encode = await bcrypt.hash(password.toString(), 10)
            await userModels.create({ firstName, username, lastName, phone, password: encode, image, gender, dateOfBirth })
            res.status(200).send({ message: "User registration successful !" });
        } else {
            {
                const username = await randomAlphabetName()
                const encode = await bcrypt.hash(password.toString(), 10)
                await userModels.create({ firstName, username, lastName, phone, password: encode, image, gender, dateOfBirth })
                res.status(200).send({ message: "User registration successful !" });
            }
        }
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
}




// User Auth Login
exports.userLogin = async (req, res) => {
    try {
        const { phone, username, password } = req.body;
        if (!phone && !username || !password) return res.status(401).send({ message: "Please input login info !" });

        const pUser = await userModels.findOne({ phone })
        const uUser = await userModels.findOne({ username })
        if (pUser || uUser && bcrypt.compare(password.toString(), pUser.password || uUser.password)) {
            const encode = CryptoJs.AES.encrypt(JSON.stringify(generateToken(pUser._id || uUser._id)), process.env.ENCRYPT_KEY).toString()
            res.status(200).send({
                authKey: encode
            })
        } else {
            res.status(401).send({ message: "Please input valid information !" });
        }
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
}



// Admin Auth