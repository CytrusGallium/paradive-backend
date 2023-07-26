const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
    name: {type:String, required:true},
    symbol: {type:String, required:true}
});

const Partner = mongoose.model("partner", partnerSchema);

module.exports = { Partner };