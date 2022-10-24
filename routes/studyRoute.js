const {guardOfAdmin, guardOfUser} = require("../helpers/authGuard");
const {addStudy, updateStudy, getStudy, deleteStudy, getUserStudy} = require("../controllers/studyController");
const {GlobalUpload} = require("../helpers/GlobalUpload");
module.exports = Router = require('express').Router();

Router.route('/study')
    .post(guardOfAdmin,GlobalUpload,addStudy)
    .get(guardOfAdmin,getStudy)
Router.route('/study/:id')
    .put(guardOfAdmin,GlobalUpload,updateStudy)
    .delete(guardOfAdmin,deleteStudy)

//User GET Premium and Free Membership all study
Router.route('/study/:subcategory')
    .get(getUserStudy)
