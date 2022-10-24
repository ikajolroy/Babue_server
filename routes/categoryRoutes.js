const {addCategory, getCategory, editCategory, deleteCategory} = require("../controllers/categoryController");
const {guardOfAdmin} = require("../helpers/authGuard");
const CategoryUpload= require("../helpers/CategoryUpload")
module.exports = Router = require('express').Router();


//Category Routes
Router.route("/category")
    .post(guardOfAdmin,CategoryUpload.upload.single("cover"),addCategory)
    .get(getCategory)
Router.route("/category/:id") //work success
    .put(guardOfAdmin,CategoryUpload.upload.single("cover"),editCategory)
    .delete(guardOfAdmin,deleteCategory)

