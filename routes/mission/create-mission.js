const { Mission } = require('../../models/mission');
const router = require("express").Router();

router.post("/", async (req, res) => {
    try {
        console.log("Creating Mission...");

        const mission = await new Mission({ authorID: "64a30cb15864373b3b0f3703", customerState: req.body.customers, totalPrice: req.body.totalPrice }).save();

        return res.status(200).send({ message: "DONE" });

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;