const mongoose = require('mongoose');

const CheckCorrectAnsSchema  = new mongoose.Schema({
    option: { type: Array, required: true},
    image: { type: String, required: true},
    name: { type: String, required: true},
    subcategory: { type:mongoose.Schema.Types.ObjectId, required: true,ref:"subcategory" },
    level: {type:Number, default:1},
},{timestamps:true})

module.exports = mongoose.model("ExamCorrectAns", CheckCorrectAnsSchema);
