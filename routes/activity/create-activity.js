const { Activity } = require('../../models/activity');
const router = require("express").Router();

router.post("/", async (req, res) => {
    try {
        console.log("Creating Activity...");

        const activity = await new Activity({ name: req.body.name, description: req.body.description, price: req.body.price }).save();

        return res.status(200).send({ message: "DONE" });

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;