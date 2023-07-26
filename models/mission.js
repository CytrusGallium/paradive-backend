const mongoose = require('mongoose');

const missionSchema = new mongoose.Schema({
    authorID: {type:String, required:true},
    customerState: {type: Object, required:true},
    // Customer state :
    // Full name
    // Activities
    // Diver
    totalPrice: {type: Number, required:false}
});

const Mission = mongoose.model("mission", missionSchema);

module.exports = { Mission };