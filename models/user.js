const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    password: { type: String, required: true },
    username: { type: String, required: true },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    token: { type: String, required: false },
});

const GenerateAuthToken = (ParamUserID) => {
    const token = jwt.sign({ _id: ParamUserID }, process.env.JWT_PRIVATE_KEY, { expiresIn: "1d" });
    return token;
}

const User = mongoose.model("user", userSchema);

const Validate = (data) => {
    const schema = joi.object({
        userName: joi.string().required().label("username"),
        password: passwordComplexity().required().label("Password")
    });
    return schema.validate(data);
}

const CreateNewUser = async (ParamName, ParamPass) => {

    const user = await User.findOne({ username: ParamName });

    if (user) {
        console.log("User creation result : FALSE");
        return false;
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(ParamPass, salt);
    await new User({ username: ParamName, password: hashPassword }).save();
    console.log("User creation result : TRUE");
    return true;
}

const CheckUserCredentialsAvailability = (ParamPhoneNumber) => {

    return new Promise(async (resolve) => {
        let user = null;

        // // Email
        // user = await User.findOne({ email: ParamEmail });
        // if (user)
        //     resolve("EMAIL_TAKEN");

        // // Phone Number
        // user = await User.findOne({ phoneNumber: ParamPhoneNumber });
        // if (user)
        //     resolve("PHONE_TAKEN");

        resolve("OK");
    });
}

const CheckUsernameAvailability = (ParamUsername) => {

    return new Promise(async (resolve) => {
        let user = null;

        user = await User.findOne({ username: ParamUsername });

        if (user)
        {
            resolve(false);
            // console.log("FALSE : " + user);
        }
        else if (user == null)
        {
            resolve(true);
            // console.log("TRUE : " + user);
        }
    });
}

module.exports = { User, Validate, CreateNewUser, CheckUserCredentialsAvailability, GenerateAuthToken, CheckUsernameAvailability };