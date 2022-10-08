const mongoose = require('mongoose');
const analyticsSchema = new mongoose.Schema({
    category: {type:mongoose.Types.ObjectId, ref:"category"},
    user: {type:mongoose.Types.ObjectId, ref:"user"},
    data: {type:Number, default:0},
},{timestamps:true})
module.exports =mongoose.model("analytics", analyticsSchema)  ;
