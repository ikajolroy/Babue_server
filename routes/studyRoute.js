const {guardOfAdmin} = require("../helpers/authGuard");
const {addStudy, updateStudy, getStudy, deleteStudy, getUserStudy} = require("../controllers/studyController");
const {GlobalUpload} = require("../helpers/GlobalUpload");
module.exports = Router = require('express').Router();

Router.route('/study')
    .post(guardOfAdmin,GlobalUpload,addStudy)
Router.route('/study/all')
    .post(guardOfAdmin,getStudy)
Router.route('/study/:id')
    .put(guardOfAdmin,GlobalUpload,updateStudy)
    .delete(guardOfAdmin,deleteStudy)

//Get Study For User of Subcategory
Router.route('/study/:subcategory')
    .get(getUserStudy)


// Temporary add new object in all data fileds
const StudyModel = require('../models/studyModel')
Router.put("/study/update/all",async (req, res) => {
  try {
      await StudyModel.updateMany({}, {$set:{"showName": req.body.showName}})
      res.send(req.body)
  }catch (err) {
      res.send(err.message)
  }
})
