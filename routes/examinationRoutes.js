module.exports = Router = require('express').Router();
const ExamImageUpload = require('../helpers/ExamImageUpload')
const {guardOfAdmin, guardOfUser} = require("../helpers/authGuard");
const {addCheckExamination, updateCheckExamination, getMCQByStudentLevel,
    deleteMcqFromAdmin
} = require("../controllers/ExamMcqController");
const {addCorrectExamination, getFromAdminCorrectExamination, updateCorrectExamination, deleteExamination,
    getRandomByStudentLevel
} = require("../controllers/ExamRandomWordController");

//MCQ Examination Router
Router.route("/exam/mcq")  //The features of Admin operations
    .post(guardOfAdmin,ExamImageUpload,addCheckExamination)
    .get(guardOfUser, getMCQByStudentLevel)
Router.route("/exam/mcq/:id")
    .put(guardOfAdmin,ExamImageUpload,updateCheckExamination)
    .delete(guardOfAdmin,deleteMcqFromAdmin)


//Global Get data with Filter
Router.post("/exam/filter",guardOfAdmin,getFromAdminCorrectExamination )


//Random MCQ examination
Router.route("/exam/random")  //The features of Admin operations
    .post(guardOfAdmin,ExamImageUpload,addCorrectExamination)
    .get(guardOfUser,getRandomByStudentLevel) //get only user random exam
Router.route("/exam/random/:id")
    .put(guardOfAdmin,ExamImageUpload,updateCorrectExamination)
    .delete(guardOfAdmin,deleteExamination)
