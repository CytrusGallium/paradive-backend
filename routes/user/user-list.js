const router = require("express").Router();
const { User } = require("../../models/user");

router.get("/", async (req, res) => {

    console.log("Getting users list...");

    // Prepare search parameters if any
    let findParams = {};
    let selectionParams = {username : 1, firstName : 1, lastName : 1};

    try {

        const result = await User.find(findParams, selectionParams);

        if (result) {
            res.status(200).send(result);
        };

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;