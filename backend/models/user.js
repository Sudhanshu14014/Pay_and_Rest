const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        require: true,
    },
    fullname: {
        type: String,
        require: true,
    },
    contact: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },

    password: {
        type: String,
        require: true,
    },
});

module.exports = mongoose.model("User", userSchema);
