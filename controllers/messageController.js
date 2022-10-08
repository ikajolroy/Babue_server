const MessageModel = require("../models/messageModel")
const {validateEmail} = require("../helpers/validator");

//Public Methods
exports.sendMessage = async (req, res) => {
    try {
        const {name, message, email} = req.body;
        if (!name ||!message ||!email) {
            return res.status(400).send({error: 'Missing required fields'});
        }

        if (!validateEmail(email.trim())){
            return res.status(400).send({message: 'Invalid email address !'});
        }
        await MessageModel.create({name, message, email});
        res.status(200).send({messages: "Successfully Send Message !"})
    }catch (e) {
        res.status(200).send({ message: e.message})
    }
}

//Admin Methods
exports.getMessages = async (req, res) => {
    try {
        const messages = await MessageModel.find().sort({createdAt: -1}).limit(20);
        res.status(200).send(messages);
    }catch (e) {
        res.status(400).send({ message: e.message})
    }
}
