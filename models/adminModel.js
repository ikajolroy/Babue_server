const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    role: { type: String, enum: ['admin', 'stuff'], required: true },
    dateOfBirth: { type: Date, required: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female', 'other'], trim: true },
    address: {
        division: { type: String,  trim: true },
        district: { type: String,  trim: true },
        postOffice: { type: String,  trim: true },
        address: { type: String, trim: true },
    },
},{timestamps:true})

module.exports = mongoose.model('admin', userSchema);
