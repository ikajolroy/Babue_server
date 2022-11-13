const mongoose = require('mongoose');

const popularSubcategory = new mongoose.Schema({
    subcategory:{type:mongoose.Schema.Types.ObjectId, ref:"Subcategory"}
},{timestamps:true})

module.exports = mongoose.model("PopularSubcategory", popularSubcategory)
