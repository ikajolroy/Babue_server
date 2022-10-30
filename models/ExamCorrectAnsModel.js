const mongoose = require('mongoose');

const CheckExamSchema  = new mongoose.Schema({
    option1: { type: String, default: ''},
    option2: { type: String, default: ''},
    option3: { type: String, default: ''},
    option4: { type: String, default: ''},
    image: { type: String, required: true},
    name: { type: String, required: true},
    subcategory: { type:mongoose.Schema.Types.ObjectId, required: true,ref:"subcategory" },
    level: {type:Number, default:1},
},{timestamps:true})

module.exports = mongoose.model("ExamChecks", CheckExamSchema);
