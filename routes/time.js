const router = require("express").Router();

router.get("/", async (req,res) => {
    try {
        console.log("Time...");

        // const currentTime = new Date().toLocaleTimeString();
        const currentTime = new Date();

        // Respond
        res.status(200).send({time:currentTime});

    } catch (error) {
        console.log("ERROR : " + error.message);
        res.status(500).send({message:"Internal server error"});
    }
})

module.exports = router;