const mongoose = require('mongoose');

const studySchema = new mongoose.Schema({
    name:{ type: String, required: true, trim: true },
    showName:{ type: Boolean, default:true },
    description:{ type: String, trim: true ,default:""},
    image:{ type: String },
    images:{ type: Array,default:[]},
    audio: { type: String},
    poem:{type:Array,default:[]},
    subcategory: { type:mongoose.Schema.Types.ObjectId, required: true,ref:"subcategory" },
},{timestamps:true})

module.exports = mongoose.model("Study",studySchema)
