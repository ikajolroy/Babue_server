const {addPopular, removePopular, getFromAdminPopular, getUserPopular} = require("../controllers/PopularSubcategoryController");
const {guardOfAdmin} = require("../helpers/authGuard");
module.exports = Router = require('express').Router();


Router.route('/popular')
    .get(getUserPopular)
    .post( guardOfAdmin,addPopular)
Router.route('/popular/:id')
    .delete( guardOfAdmin,removePopular)
Router.get("/popular/admin",getFromAdminPopular)
