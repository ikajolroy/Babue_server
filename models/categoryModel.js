const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title: { type: String, required: true },
    name: { type: String, required: true },
    cover: { type: String, required: true },
    createdBy:{type:mongoose.Types.ObjectId, required: true , ref:"user"},
})
module.exports = mongoose.model('Category', categorySchema);
