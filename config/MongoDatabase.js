const mongoose = require("mongoose");

module.exports = connectDatabase = async () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("Connected to MongoDB"))
        .catch(err => console.log("Failed to connect to MongoDB: " + err));
}