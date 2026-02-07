const mongoose = require("mongoose")

// schema takes 2 {} parameters ,  2 nd - automatic parameters(default key), created at , updated op - timestamp
module.exports = mongoose.model("todo", new mongoose.Schema({
    task: { type: String, required: true },
    desc: { type: String, required: true },
    priority: { type: String, required: true },
    complete: { type: Boolean, required: false },
}, { timestamps: true }))