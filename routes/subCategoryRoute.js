const {guardOfAdmin} = require("../helpers/authGuard");
const {addSubcategory, getSubcategory, deleteSubcategory,
    editSubcategory, getSubcategoryInUser,
    getSubCategoryFromId, getMCQOnlyCategory, searchSubcategory
} = require("../controllers/subcategoryController");
module.exports = Router = require('express').Router();
const multer = require('multer');
const fs = require("fs");
const path = require("path");




//Subcategory Routes
Router.route("/subcategory")
    .get(guardOfAdmin,getSubcategory)
Router.route("/subcategory/:id")
    .delete(guardOfAdmin,deleteSubcategory)
    .get(getSubcategoryInUser) // cat id to Get child Subcategories

Router.route("/s/:subcategory")
    .get(getSubCategoryFromId) // cat id to Get child Subcategories
Router.route("/exam/mcq/subcategory")
    .get(guardOfAdmin,getMCQOnlyCategory) // Access from admin Examination pages

Router.post("/search/subcategory", searchSubcategory)





//Edit Subcategory multer working current file only
Router.put("/subcategory/:id",guardOfAdmin,function(req, res, next) {

    const upload = multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {

                const dir = 'assets/subcategory'
                if (!fs.existsSync(dir)){

                    fs.mkdirSync(dir, { recursive: true });
                }
                cb(null, "assets/subcategory")
            },
            filename: (req, file, cb) => {
                cb(null, file.fieldname+Date.now()+path.extname(file.originalname));
            },
        }),
        fileFilter: (req, file, cb) => {
            if (file.mimetype.split('/')[0]==="image") {
                cb(null, true);
            } else {
                cb(null, false);
            }
        }  ,
        limits: 1024 * 1024 * 2
    }).fields([{name: "front"}, {name: "back"}]);

    upload(req, res, (err) => {
        if (err) return res.status(404).send({ message: "Provide valid image !"})
        next();
    });
},editSubcategory)




//Subcategory POST Multer working current file only
Router.post("/subcategory", guardOfAdmin,function(req, res, next) {

    const upload = multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {

                const dir = 'assets/subcategory'
                if (!fs.existsSync(dir)){

                    fs.mkdirSync(dir, { recursive: true });
                }
                cb(null, "assets/subcategory")
            },
            filename: (req, file, cb) => {
                cb(null, file.fieldname+Date.now()+path.extname(file.originalname));
            },
        }),
        fileFilter: (req, file, cb) => {
            if (file.mimetype.split('/')[0]==="image") {
                cb(null, true);
            } else {
                cb(null, false);
            }
        }  ,
        limits: 1024 * 1024 * 2
    }).fields([{name: "front"}, {name: "back"}]);

    upload(req, res, (err) => {
        if (err) return res.status(404).send({ message: "Image"})
        next();
    });
},addSubcategory);
