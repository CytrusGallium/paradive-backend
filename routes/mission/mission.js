const router = require("express").Router();
const { Mission } = require("../../models/mission");

router.get("/", async (req, res) => {

    console.log("Getting mission : " + req.query.id);

    // Prepare search parameters if any
    // let findParams = { _id: req.query.id };
    // let selectionParams = {};

    try {

        const result = await Mission.findById(req.query.id);

        if (result) {
            res.status(200).send(result);
        };

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;