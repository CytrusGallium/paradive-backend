const router = require("express").Router();
const {User} = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post("/", async (req,res) => {
    try {
        console.log("Login attempt : User = " + req.body.username);
        
        const user = await User.findOne({username:req.body.username});
        
        // Check user
        if (user)
        {
            // console.log("USER FOUND : " + user.username);
            // console.log("USER PASSWORD = " + user.password);

            // Check password
            const passCheck = await bcrypt.compare(req.body.password, user.password);

            if (passCheck)
            {
                console.log("Login : OK");
                res.status(201).json({
                    code: "LOGIN_OK",
                    _id: user.id,
                    name: user.name,
                    token: generateAuthToken(user._id),
                    // level: user.level
                });
            }
            else
            {
                console.log("Login Attempt : Incorrect Password...");
                res.status(401).json({code:"INCORRECT_PASSWORD"});
            }
        }
        else
        {
            console.log("Login Attempt : User not found...");
            res.status(401).json({code:"USER_NOT_FOUND"});
        }
        
    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({message:"Internal server error"});
    }
})

// Generate JWT
const generateAuthToken = (id) => {
    return jwt.sign({id}, process.env.JWT_PRIVATE_KEY, {expiresIn:"7d"});
}

module.exports = router;