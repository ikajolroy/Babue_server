const {sendMessage, getMessages} = require("../controllers/messageController");
module.exports = Router = require('express').Router();

Router.route('/message')
    .post(sendMessage)
    .get(getMessages)
