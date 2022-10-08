const userModels = require("../models/userModels")
const fs = require("fs");

//BD Phone number validator
exports.validPhone = (phone) => {
    return phone.trim().match(
        /^(?:\+88|88)?(01[3-9]\d{8})$/
    )
}
exports.validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

exports.signUpValidator = async (req, res, next) => {
    const image =req.file&&req.protocol + '://' + req.get('host') + "/" + req.file.destination+"/"+req.file.filename
    const splitDir = image&&"assets/user/"+image.split('/').pop();
    try {

        const { name, email, password, phone, guardian, dateOfBirth, gender } = req.body;
        if (!name || !email || !password || !phone || !guardian || !dateOfBirth || !gender ) {
            fs.unlinkSync(splitDir)
            return res.status(404).send({ message: "Please fill-up all fields !" });
        }

        // Check Already Exists user
        const user = await userModels.findOne({ phone })
        const userEmail = await userModels.findOne({ email })
        if (user || userEmail){
            fs.unlinkSync(splitDir)
            return res.status(400).send({ message: "You'r already registered please login !" });
        }

        // Email validator
        if (!this.validateEmail(email.trim())){
            fs.unlinkSync(splitDir)
            return res.status(403).send({ message: "Please enter a valid email address !" });
        }


        // Phone Number Validation
        if (!this.validPhone(phone.toString())) {
            fs.unlinkSync(splitDir)
           return res.status(404).send({ message: "Please enter a valid phone number !" });
        }
        if(password.length<4){
            fs.unlinkSync(splitDir)
           return res.status(404).send({ message: "Password minimum 4 characters !" });
        }else {
            next()
        }
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
}
