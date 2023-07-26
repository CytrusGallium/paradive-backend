const mongoose = require("mongoose");

const connectToDatabase = async (ParamDbConnectString) => {

    return new Promise(async (resolve, reject) => {
        try {
            await mongoose.connect(ParamDbConnectString);
            console.log("Connected to Database Successfully!");
            mongoose.set("strictQuery", false);
            resolve(true);
        } catch (error) {
            console.error("Failed to connect to Database : ", error);
            resolve(false);
        }
    });


};

module.exports = connectToDatabase;