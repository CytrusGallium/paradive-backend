const { Partner } = require('../../models/partner');
const router = require("express").Router();

router.post("/", async (req, res) => {
    try {
        console.log("Creating Partner...");

        const partner = await new Partner({ name: req.body.name, symbol: req.body.symbol }).save();

        return res.status(200).send({ message: "DONE" });

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;