const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, trim: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    role: { type: String, enum: ['admin', 'stuff'], required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ['male', 'female', 'other'], trim: true },
    address: {
        division: { type: String, required: true, trim: true },
        district: { type: String, required: true, trim: true },
        postOffice: { type: String, required: true, trim: true },
        address: { type: String, required: true, trim: true },
    },
})

module.exports = mongoose.model('user', userSchema);