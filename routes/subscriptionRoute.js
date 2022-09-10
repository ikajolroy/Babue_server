const {addSubscription, getAllSubscriptions, deleteSubscriptions, updateSubscriptions, textSub} = require("../controllers/subscriptionController");
const {guardOfAdmin} = require("../helpers/authGuard");
module.exports = Router = require('express').Router();


Router.route("/subscription")
    .post(guardOfAdmin,addSubscription)
    .get(getAllSubscriptions)
Router.put("/subscription/:id", guardOfAdmin,updateSubscriptions)
Router.delete("/subscription/:id", guardOfAdmin,deleteSubscriptions)
