const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    title:{type: 'string',required: true, trim: true},
    duration:{type: Number, required: true, trim: true},
    price:{type:Number, required: true, trim: true},
    badge:{type:String,enum: ['regular',"popular", 'vip'], required: true},
    feature:{type:Array,required: true},
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"admin", required: true},
},{timestamps:true})

module.exports = mongoose.model("Subscription", subscriptionSchema)
