const { userRegister, userLogin } = require('../controllers/authControllers');
const { getUserData } = require('../controllers/userControllers');
const { guardOfUser } = require('../helpers/authGuard');
const { upload } = require('../helpers/upload');
const { signUpValidator } = require('../helpers/validator');
module.exports = Router = require('express').Router();






Router.post("/register", upload.single("image"), signUpValidator, userRegister)
Router.post("/login", userLogin)
Router.route("/user")
    .get(guardOfUser, getUserData)

















