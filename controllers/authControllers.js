const userModels = require('../models/userModels');
const  adminModel=  require('../models/adminModel');
const CryptoJs = require('crypto-js');
const { generateToken } = require('../helpers/generator');

// User Auth Registration
exports.userRegister = async (req, res) => {
    const image_url = req.protocol + '://' + req.get('host') + "/" + req.file.path
    const userData = { ...req.body, image: image_url }
    try {
        const encryptPass = CryptoJs.AES.encrypt(userData.password, process.env.ENCRYPT_KEY)
        const email = userData.email.toLowerCase();
        const  user  = await userModels.create({ ...userData,email, password: encryptPass })
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
        const uUser = await userModels.findOne({ email:emailOrPhone.toLowerCase() })
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



// Admin Registration
exports.adminRegistration =  async (req, res) => {
    try {
        const {email, password} = req.body;

    }catch (error) {
        return res.status(404).send({ message: error.message });
    }
}


// Admin Login
exports.adminLogin = async (req, res) =>{
    try {
        const {email, password} = req.body;
        if (!email||!password)
            return res.status(401).send({ message:"Invalid login request !"})
        const admin = await adminModel.findOne({email})
        if (!admin)
            return res.status(403).json({ message: "Not found data! try another " });

        // Decrypt Password
        const bytes = CryptoJs.AES.decrypt(admin.password.toString(), process.env.ENCRYPT_KEY);
        const decode = bytes.toString(CryptoJs.enc.Utf8)
        if (password===decode){
            const {password, _id, __v,...other} = admin._doc
            res.status(200).send({
                token:generateToken(admin._id),
                ...other
            })
        }else{
            res.status(401).send({ message:"Wrong Email or Password !"})
        }
    }catch (error) {
        return res.status(404).send({ message: error.message });
    }
}
