const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    authorID: {type:String, required:true},
    fullName: {type:String, required:true},
    phoneNumber: {type:String, required:false},
    registrationDate: { type: Date, default: Date.now },
    age: { type: Number, default: 0 }
});

const Customer = mongoose.model("customer", customerSchema);

module.exports = { Customer };