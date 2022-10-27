const mongoose = require('mongoose');

const subCategoryModel = new mongoose.Schema({
    name: { type: String, required: true},
    frontImage: { type: String, required: true },
    backImage: { type: String, required: true },
    membership: { type: String,default:"free", required: true, enum:["premium", "free"]},
    layout:{
        type: String,
        required: true,
        enum:[
            "vowel",
            "consonant",
            "alphabetic",
            "smallAlpha",
            'number',
            'color',
            'animal',
            'food',
            'poem',
            "gallery",
            "caseStudy",
            "slide",
            "cube",
            'poem',
            "card",
            "creative",
            "grab",
            "grid",
            "column"
        ]
    },
    position: { type: Number, required: true},
    category:{ type: mongoose.Schema.Types.String, required: true, ref: 'category'},
    createdBy:{type:mongoose.Schema.Types.ObjectId, required: true , ref:"admin"},
})

module.exports = mongoose.model("Subcategory", subCategoryModel);
