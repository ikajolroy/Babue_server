const {getOrCreateAnalysis, updateAnalysis} = require("../controllers/analysisController");
const {guardOfUser} = require("../helpers/authGuard");
module.exports = Router = require('express').Router();

Router.route('/analytics')
    .post(guardOfUser,getOrCreateAnalysis)

Router.put("/analytics/:id",guardOfUser,updateAnalysis)
