module.exports = Router = require('express').Router();
const { userRegister, userLogin, adminLogin, adminRegistration} = require('../controllers/authControllers');
const { getUserData } = require('../controllers/userControllers');
const { guardOfUser } = require('../helpers/authGuard');
const UserUpload= require('../helpers/UserUpload');
const { signUpValidator } = require('../helpers/validator');





Router.post("/register", UserUpload.upload.single("image"), signUpValidator, userRegister)
Router.post("/login", userLogin)
Router.post("/admin", adminLogin)
Router.post("/admin/registration", adminRegistration)   //Test Mode only

Router.route("/user")
    .get(guardOfUser, getUserData)

















