module.exports = Router = require('express').Router();
const { userRegister, userLogin, adminLogin} = require('../controllers/authControllers');
const { getUserData } = require('../controllers/userControllers');
const { guardOfUser } = require('../helpers/authGuard');
const { upload } = require('../helpers/upload');
const { signUpValidator } = require('../helpers/validator');





Router.post("/register", upload.single("image"), signUpValidator, userRegister)
Router.post("/login", userLogin)
Router.post("/admin", adminLogin)
Router.route("/user")
    .get(guardOfUser, getUserData)

















