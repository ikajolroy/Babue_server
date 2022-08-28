const userModels = require('../models/userModels');
const CryptoJs = require('crypto-js');
const { generateToken } = require('../helpers/generator');

// User Auth Registration
exports.userRegister = async (req, res) => {
    const image_url = req.protocol + '://' + req.get('host') + "/" + req.file.path
    const userData = { ...req.body, image: image_url }
    try {
        const encryptPass = CryptoJs.AES.encrypt(userData.password, process.env.ENCRYPT_KEY)

        const  user  = await userModels.create({ ...userData, password: encryptPass })
        const token = generateToken(user._id)
        const encrypt = CryptoJs.AES.encrypt(token, process.env.ENCRYPT_KEY).toString();
        return res.status(201).json({
            token: encrypt
        });
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
}


// User Auth Login
exports.userLogin = async (req, res) => {
    try {
        const { emailOrPhone, password } = req.body;
        if (!emailOrPhone || !password)
            return res.status(401).send({ message: "Invalid login request !" });

        const pUser = await userModels.findOne({ phone:emailOrPhone })
        const uUser = await userModels.findOne({ email:emailOrPhone })
        if (!pUser && !uUser)
            return res.status(403).json({ message: "User not found ! try another " });

        // Decrypt Password
        const user = pUser || uUser
        const bytes = CryptoJs.AES.decrypt(user.password.toString(), process.env.ENCRYPT_KEY);
        const decode = bytes.toString(CryptoJs.enc.Utf8)

        if (pUser || uUser && password === decode) {
            const token = generateToken(user._id)
            const encrypt = CryptoJs.AES.encrypt(token, process.env.ENCRYPT_KEY).toString();
            return res.status(200).json({
                token: encrypt
            });
        } else
            return res.status(403).json({ message: "Incorrect phone/email or password ! " });

    } catch (error) {
        res.status(404).send({ message: error.message });
    }
}



// Admin Auth