const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, unique: true, trim: true },
    email: { type: String, unique: true,  trim: true },
    password: { type: String, required: true },
    image: { type: String, default:'' },
    phoneVerify: { type: Boolean, default: false },
    emailVerify: { type: Boolean, default: false },
    dateOfBirth: { type: Date},
    gender: { type: String, enum: ['male', 'female', 'other'] },
    guardian: { type: String,  },
    level: { type:Number, default:1},
    studyClass: { type: Number, default: 0, trim: true },
    address: {
        division: { type: String, default: "", trim: true },
        district: { type: String, default: "", trim: true },
        postOffice: { type: String, default: "", trim: true },
        postCode: { type: Number, default: 0 },
        address: { type: String, default: "", trim: true },
    },
})

module.exports = mongoose.model('User', userSchema);
