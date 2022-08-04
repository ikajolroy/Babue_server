const { userRegister, userLogin } = require('../controllers/authControllers');

module.exports = Router = require('express').Router();

Router.post("/register", userRegister)
Router.post("/login", userLogin)

















