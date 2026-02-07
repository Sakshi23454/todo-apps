const mongoose = require("mongoose")

// schema takes 2 {} parameters ,  2 nd - automatic parameters(default key), created at , updated op - timestamp
module.exports = mongoose.model("user", new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isActive: { type: Boolean, default: true },
}, { timestamps: true }))