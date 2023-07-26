console.log("=======================================================");
console.log("ParaDive Backend");
console.log("=======================================================");

// Requirments
const dotenv = require('dotenv');
const cors = require('cors');
const { DoJwtCheck } = require('./middleware/AuthCheck');
const { CreateNewUser, CheckUsernameAvailability } = require('./models/user');
const connectToDatabase = require("./db");

const Run = async () => {
    // DotEnv
    dotenv.config();

    // Express
    const express = require('express');
    const app = express();

    // Middleware
    app.use(express.json());
    app.use(cors());
    app.use(function (req, res, next) { setTimeout(next, 500) });

    // Connect to Database
    await connectToDatabase(process.env.DB);

    // ================================================
    // ROUTES
    // ================================================
    const loginRoute = require('./routes/login');
    app.use("/api/login", loginRoute);

    const pingRoute = require('./routes/ping');
    app.use("/api/ping", pingRoute);

    const timeRoute = require('./routes/time');
    app.use("/api/time", timeRoute);

    const createDiverRoute = require('./routes/diver/create-diver');
    app.use("/api/create-diver", createDiverRoute);

    const diverListRoute = require('./routes/diver/diver-list');
    app.use("/api/diver-list", diverListRoute);

    const createActivityRoute = require('./routes/activity/create-activity');
    app.use("/api/create-activity", createActivityRoute);

    const activityListRoute = require('./routes/activity/activity-list');
    app.use("/api/activity-list", activityListRoute);

    const createMissionRoute = require('./routes/mission/create-mission');
    app.use("/api/create-mission", createMissionRoute);

    const missionListRoute = require('./routes/mission/mission-list');
    app.use("/api/mission-list", missionListRoute);

    const createPartnerRoute = require('./routes/partner/create-partner');
    app.use("/api/create-partner", createPartnerRoute);

    const partnerListRoute = require('./routes/partner/partner-list');
    app.use("/api/partner-list", partnerListRoute);

    const userListRoute = require('./routes/user/user-list');
    app.use("/api/user-list", userListRoute);

    const createUserRoute = require('./routes/user/create-user');
    app.use("/api/create-user", createUserRoute);

    const missionRoute = require('./routes/mission/mission');
    app.use("/api/mission", missionRoute);

    // const signupRoute = require('./routes/signup');
    // app.use("/api/signup", signupRoute);

    // ================================================
    // Initialize some stuff...
    // ================================================
    const adminUsernameAvailable = await CheckUsernameAvailability(process.env.DEFAULT_ADMIN_USERNAME);
    if (adminUsernameAvailable) {
        console.log("Creating admin user...");
        CreateNewUser(process.env.DEFAULT_ADMIN_USERNAME, process.env.DEFAULT_ADMIN_PASSWORD);
    }
    else {
        console.log("Admin already registred.");
    }

    // ================================================
    // LISTEN
    // ================================================
    let port = process.env.PORT || 4000;
    app.listen(port, () => {
        console.log(`Server is up and running on port ${port}`);
        console.log("=======================================================");
    });
}

Run();