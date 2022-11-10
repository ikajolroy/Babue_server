module.exports = Router = require('express').Router();
const {  userLogin, adminLogin, adminRegistration, createAccount} = require('../controllers/authControllers');
const { getUserData } = require('../controllers/userControllers');
const { guardOfUser } = require('../helpers/authGuard');
// const UserUpload= require('../helpers/UserUpload');
const { signUpValidator } = require('../helpers/validator');



// UserUpload.upload.single("image"),

Router.post("/register",  signUpValidator, createAccount)
Router.post("/login", userLogin)
Router.post("/admin", adminLogin)
Router.post("/admin/registration", adminRegistration)   //Test Mode only

Router.route("/user")
    .get(guardOfUser, getUserData)

















