const { Diver } = require('../../models/diver');
const router = require("express").Router();

router.post("/", async (req, res) => {
    try {
        console.log("Creating Diver...");

        const diver = await new Diver({ firstName: req.body.firstName, familyName: req.body.familyName }).save();

        return res.status(200).send({ message: "DONE" });

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;