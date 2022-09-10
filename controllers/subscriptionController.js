const SubscriptionModel = require('../models/subscriptionModel')
const {sendEmail} = require("../helpers/email");



exports.addSubscription =async (req, res)=> {
    const {price, title,duration,badge,feature} = req.body;
    try {
        if(!price || !title || !duration || !badge || !feature) {
            return res.status(404).send({message: 'Please enter all data !'})
        }
        await  SubscriptionModel.create({title, price, duration, badge, feature, createdBy: req.admin._id})
        res.status(200).send({message: 'Subscription added successfully !'})
    }catch (err) {
        res.status(404).send({message:err.message});
    }
}


// GET /subscriptions
exports.getAllSubscriptions = async (req, res) => {
    try {
       const subscription = await SubscriptionModel.find({}).sort({price:+1})
        res.status(200).send(subscription)
    }catch (err) {
        res.status(404).send({message:err.message});
    }
}


// Put /subscriptions
exports.updateSubscriptions = async (req, res) => {
    try {

         await SubscriptionModel.findByIdAndUpdate(req.params.id,{
            $set: {...req.body }
        })
        res.status(200).send({message:"Update Successfully !"})
    }catch (err) {
        res.status(404).send({message:err.message});
    }
}


// Delete /subscriptions
exports.deleteSubscriptions = async (req, res) => {

    try {
        await SubscriptionModel.findByIdAndDelete(req.params.id)
        res.status(200).send({message:"Deleted successfully !"})
    }catch (err) {
        res.status(404).send({message:err.message});
    }
}

