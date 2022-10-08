const mongoose = require('mongoose');

const carouselSchema= new mongoose.Schema({
    image:{ type: String, required: true},
    position:{ type: Number, required: true},
    description:{ type: String, default:'', trim: true  },
    active:{ type: Boolean, default: true,}
},{timestamps:true})

module.exports = mongoose.model('Carousel',carouselSchema);
