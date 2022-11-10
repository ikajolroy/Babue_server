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
            'number',
            "animal",
            'color',
            'poem',
            "caseStudy",
            "mcq",
            "quiz",
            "grid",
            "learn"
        ]
    },
    position: { type: Number, required: true},
    category:{ type: mongoose.Schema.Types.String, required: true, ref: 'category'},
    createdBy:{type:mongoose.Schema.Types.ObjectId, required: true , ref:"admin"},
})

module.exports = mongoose.model("Subcategory", subCategoryModel);
