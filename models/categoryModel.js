const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title: { type: String, required: true },
    name: { type: String, required: true },
    cover: { type: String, required: true },
    position: { type: Number, required: true,unique: true},
    createdBy:{type:mongoose.Types.ObjectId, required: true , ref:"admin"},
})
module.exports = mongoose.model('Category', categorySchema);
