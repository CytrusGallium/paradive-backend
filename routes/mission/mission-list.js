const router = require("express").Router();
const { Mission } = require("../../models/mission");

router.get("/", async (req, res) => {

    console.log("Getting missions list...");

    // Prepare search parameters if any
    let findParams = {};
    let selectionParams = {};

    try {

        const result = await Mission.find(findParams, selectionParams);

        if (result) {
            res.status(200).send(result);
        };

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;