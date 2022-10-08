const mongoose = require('mongoose');

const subCategoryModel = new mongoose.Schema({
    name: { type: String, required: true},
    frontImage: { type: String, required: true },
    backImage: { type: String, required: true },
    category:{ type: mongoose.Schema.Types.String, required: true, ref: 'category'},
    createdBy:{type:mongoose.Schema.Types.ObjectId, required: true , ref:"user"},
})

module.exports = mongoose.model("Subcategory", subCategoryModel);
