const mongoose = require('mongoose');

const studySchema = new mongoose.Schema({
    title:{ type: String, required: true, trim: true },
    cover: { type: String, required: true},
    subcategory: { type:mongoose.Schema.Types.ObjectId, required: true,ref:"subcategory" },
},{timestamps:true})

module.exports = mongoose.model("Study",studySchema)
