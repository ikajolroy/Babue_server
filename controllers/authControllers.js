const userModels = require('../models/userModels');
const CryptoJs = require('crypto-js');

// User Auth Registration
exports.userRegister = async (req, res) => {
    const image_url = req.protocol + '://' + req.get('host') + "/" + req.file.path
    const userData = { ...req.body, image: image_url }
    try {
        const encryptPass = CryptoJs.AES.encrypt(userData.password, process.env.ENCRYPT_KEY)

        await userModels.create({ ...userData, password: encryptPass })
        return res.status(200).send({ message: "Registration successfully !" })

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

    } catch (error) {
        res.status(404).send({ message: error.message });
    }
}



// Admin Auth