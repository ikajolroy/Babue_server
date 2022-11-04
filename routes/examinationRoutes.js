module.exports = Router = require('express').Router();
const ExamImageUpload = require('../helpers/ExamImageUpload')
const {guardOfAdmin, guardOfUser} = require("../helpers/authGuard");
const {addCheckExamination, updateCheckExamination, getFromAdminCheckExamination, getMCQByStudentLevel} = require("../controllers/ExamCheckController");
const {addCorrectExamination, getFromAdminCorrectExamination} = require("../controllers/ExamCorrectAnsController");

//MCQ Examination Router
Router.route("/exam/check")  //The features of Admin operations
    .post(guardOfAdmin,ExamImageUpload,addCheckExamination)
    .get(guardOfUser, getMCQByStudentLevel)
Router.post("/exam/check/filter",guardOfAdmin,getFromAdminCorrectExamination )
Router.route("/exam/check/:id")
    .put(guardOfAdmin,ExamImageUpload,updateCheckExamination)




//correct  answers examination
Router.route("/exam/correct")  //The features of Admin operations
    .post(guardOfAdmin,ExamImageUpload,addCorrectExamination)
    .get(guardOfAdmin,getFromAdminCheckExamination) //admin from all
Router.route("/exam/correct/:id")
    .put(guardOfAdmin,ExamImageUpload,updateCheckExamination)
