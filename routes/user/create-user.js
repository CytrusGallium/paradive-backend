const { User } = require('../../models/user');
const router = require("express").Router();
const bcrypt = require('bcrypt');

router.post("/", async (req, res) => {
    try {
        console.log("Creating User...");

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const user = await new User({
            username: req.body.username,
            password: hashPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber
        }).save();

        return res.status(200).send({ message: "DONE" });

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;