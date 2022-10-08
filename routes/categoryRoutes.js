const {addCategory, getCategory, editCategory, deleteCategory} = require("../controllers/categoryController");
const {guardOfAdmin} = require("../helpers/authGuard");
const CategoryUpload= require("../helpers/CategoryUpload")
const Subcategory = require("../helpers/SubcategoryUpload")
const {addSubcategory, getSubcategory, deleteSubcategory, editSubcategory} = require("../controllers/subcategoryController");
module.exports = Router = require('express').Router();

//Category Routes
Router.route("/category")
    .post(guardOfAdmin,CategoryUpload.upload.single("cover"),addCategory)
    .get(getCategory)
Router.route("/category/:id") //work success
    .put(guardOfAdmin,CategoryUpload.upload.single("cover"),editCategory)
    .delete(guardOfAdmin,deleteCategory)


//Subcategory Routes
Router.route("/subcategory")
    .post(guardOfAdmin,Subcategory.upload.array("image", 2),addSubcategory)
    .get(getSubcategory)
Router.route("/subcategory/:id") //work success
    .put(guardOfAdmin,Subcategory.upload.array("image",2),editSubcategory)
    .delete(guardOfAdmin,deleteSubcategory)
