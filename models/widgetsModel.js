const mongoose = require('mongoose');

const widgetsSchema = new mongoose.Schema({
    social: {
        youtube: {type: String},
        facebook: {type: String},
        twitter: {type: String},
        linkedin: {type: String},
        instagram: {type: String},
    },
    helpline: {type: String, default: ""},
    email: {type: String, default: ""},
    address: {type: String, default: ""}
}, {timestamps: true})

module.exports = mongoose.model("Widgets", widgetsSchema)


// meta description, site title, site icons,
