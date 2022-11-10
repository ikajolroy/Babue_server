const userModels = require('../models/userModels');
const  adminModel=  require('../models/adminModel');
const CryptoJs = require('crypto-js');
const { generateToken } = require('../helpers/generator');
const {sendEmail} = require("../helpers/email");

// User Auth Registration
// exports.userRegister = async (req, res) => {
//     if (!req.file)return res.status(404).send({ message: "Image not valid please check type/size !"})
//
//     const image =req.file&&req.protocol + '://' + req.get('host') + "/" + req.file.destination+"/"+req.file.filename
//
//     const userData = { ...req.body, image }
//     try {
//         const encryptPass = CryptoJs.AES.encrypt(userData.password, process.env.ENCRYPT_KEY)
//         const email = userData.email.toLowerCase();
//         const  user  = await userModels.create({ ...userData,email, password: encryptPass })
//         const token = generateToken(user._id)
//         const encrypt = CryptoJs.AES.encrypt(token, process.env.ENCRYPT_KEY).toString();
//
//         //Send Email
//         const subject = "Registration successfully"
//         const html =`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Confirmation message</title><style>@import url(https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap);body{margin:0;font-family:Roboto,sans-serif}#brand_icon{max-width:200px}.brand{font-weight:700}p{max-width:350px}#button_a{display:block;background:#259af2;max-width:350px;border-radius:5px;padding:5px 0;font-size:14px;text-decoration:none;color:#fff}#button_a:hover{background:#2088d8}#check{max-width:100px}.bottom{max-width:400px;padding:20px;border-bottom:1px solid gray}#help_t{margin-bottom:10px;margin-top:20px}#thanks_m{font-size: 18px}#help_p{font-size:13px;margin:0}.footer p{margin-bottom:0;font-size:13px}.footer img{max-width:100px}</style></head><body><div class="full_body"><center><img id="brand_icon" src="https://admin.babue.me/assets/babue.png" alt="logo"><div class="top"><h1 style="margin-top:0">Hi, ${user.name} !</h1><p id="thanks_m">Thanks for signup to the <span class="brand"> Babue</span>, your account is ready for study now.</p><img id="check" src="https://admin.babue.me/assets/greencheck.png" alt=""><a id="button_a" target="_blank" href="https://app.babue.me/">Visit account</a></div><div class="bottom"><h3 id="help_t">Need help ?</h3><p id="help_p">Please send any feedback or bug reports to visit <a href="http://app.babue.me"> Babue </a> footer feedback form.</p></div><div class="footer"><p>@copyright all right reserved</p><img src="https://cdn.pixabay.com/photo/2020/06/30/14/37/facebook-5356593_960_720.png" alt=""></div></center></div></body></html>`
//         sendEmail(email,subject,html)
//
//         //Response
//         return res.status(201).json({
//             token: encrypt,
//             name:user.name,
//             email:user.email,
//             gender:user.gender,
//             image: user.image,
//             dateOfBirth:user.dateOfBirth,
//             guardian: user.guardian,
//             phone: user.phone,
//         });
//     } catch (error) {
//         res.status(404).send({ message: error.message });
//     }
// }
exports.createAccount = async (req, res)=>{
    try {
        const {password, phone, name} = req.body
        const encryptPass = CryptoJs.AES.encrypt(password, process.env.ENCRYPT_KEY)
        const  user  = await userModels.create({  phone, name, password: encryptPass })
        const token = generateToken(user._id)
        const encrypt = CryptoJs.AES.encrypt(token, process.env.ENCRYPT_KEY).toString();

        //Response
        return res.status(201).json({
            token: encrypt,
            name:user.name,
            phone: user.phone,
        });
    }catch (error) {
        res.status(500).send({ message: error.message });
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
                token: encrypt,
                name:user.name,
                email:user.email,
                gender:user.gender,
                image: user.image,
                dateOfBirth:user.dateOfBirth,
                guardian: user.guardian,
                phone: user.phone,
            });
        } else
            return res.status(403).json({ message: "Incorrect phone/email or password ! " });

    } catch (error) {
        res.status(404).send({ message: error.message });
    }
}



// Admin Registration
exports.adminRegistration =  async (req, res) => {
    const {name,image,role, phone,email,password,dateOfBirth} =req.body
    try {
        const findAd = await  adminModel.findOne({email})
        if (findAd)
            return res.status(403).json({ message: "Email already exists" });
        await  adminModel.create({ name, image,role,phone,email,password,dateOfBirth });
        res.status(200).send({ message: 'Registration successfully !'})
    }catch (error) {
        return res.status(404).send({ message: error.message });
    }
}


// Admin Login
exports.adminLogin = async (req, res) =>{
    try {
        const {email, password} = req.body;
        if (!email||!password)
            return res.status(401).send({ message:"Invalid login data !"})
        const admin = await adminModel.findOne({email})
        if (!admin)
            return res.status(403).json({ message: "Data not found ! try another " });

        // Decrypt Password
        const bytes = CryptoJs.AES.decrypt(admin.password.toString(), process.env.ENCRYPT_KEY);
        const decode = bytes.toString(CryptoJs.enc.Utf8)
        if (password===decode){
            const {password, _id, __v,...other} = admin._doc
            const token = generateToken(admin._id)
            const encrypt = CryptoJs.AES.encrypt(token, process.env.ENCRYPT_KEY).toString();
            return res.status(200).json({
                token: encrypt,
                name:admin.name,
                email: admin.email,
                gender: admin.gender,
                role: admin.role,
                image: admin.image
            });
        }else{
            res.status(401).send({ message:"Wrong Email or Password !"})
        }
    }catch (error) {
        return res.status(404).send({ message: error.message });
    }
}
