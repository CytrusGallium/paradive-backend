const mongoose = require('mongoose');

const diverSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    familyName: { type: String, required: true },
    deleted: { type: Boolean, default: false }
});

const Diver = mongoose.model("diver", diverSchema);

module.exports = { Diver };