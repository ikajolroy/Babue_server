const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, default: "", trim: true },
    image: { type: String, required: true, trim: true },
    phoneVerify: { type: Boolean, default: false },
    emailVerify: { type: Boolean, default: false },
    dateOfBirth: { type: Date },
    old: { type: Number, required: true },
    gender: { type: String, enum: ['male', 'female', 'other'], trim: true },
    studyClass: { type: Number, default: 0, trim: true },
    address: {
        division: { type: String, default: "", trim: true },
        district: { type: String, default: "", trim: true },
        postOffice: { type: String, default: "", trim: true },
        address: { type: String, default: "", trim: true },
    },
})

module.exports = mongoose.model('user', userSchema);