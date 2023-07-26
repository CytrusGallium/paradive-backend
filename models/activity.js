const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    name: {type:String, required:true},
    description: {type:String, required:false},
    price: {type:Number, default: 0}
});

const Activity = mongoose.model("activity", activitySchema);

module.exports = { Activity };