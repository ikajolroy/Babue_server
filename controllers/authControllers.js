const userModels = require('../models/userModels');
const  adminModel=  require('../models/adminModel');
const CryptoJs = require('crypto-js');
const { generateToken } = require('../helpers/generator');
const {sendEmail} = require("../helpers/email");

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

        //Send Email
        const subject = "Registration successfully"
        const html =`<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\"><meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Registration Successfully</title></head><body style=\"font-family:Arial,Helvetica,sans-serif\"><center><img width=\"50px\" height=\"50px\" src=\"https://cdn-icons-png.flaticon.com/512/148/148767.png\" alt=\"success\"><h2>Registration Successfully</h2><p>Thanks you <b>${user.name}</b></p><p>As an extra security precaution, please verify your email address to continue our extra service</p></center></body></html>`
        sendEmail(email,subject,html)

        //Response
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
            const token = generateToken(admin._id)
            const encrypt = CryptoJs.AES.encrypt(token, process.env.ENCRYPT_KEY).toString();
            return res.status(200).json({
                token: encrypt
            });
        }else{
            res.status(401).send({ message:"Wrong Email or Password !"})
        }
    }catch (error) {
        return res.status(404).send({ message: error.message });
    }
}
