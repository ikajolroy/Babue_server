const { userRegister, userLogin } = require('../controllers/authControllers');
const path = require('path');
const multer = require('multer');
const { signUpValidator } = require('../helpers/validator');

module.exports = Router = require('express').Router();

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "images")
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname));
        },

    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png") {
            cb(null, true)
        } else {
            cb(null, false)
        }
    }
    ,
    limits: 1024 * 1024 * 5
})




Router.post("/register", upload.single("image"), signUpValidator, userRegister)
Router.post("/login", userLogin)

















