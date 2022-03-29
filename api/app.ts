import feathers from '@feathersjs/feathers';
import '@feathersjs/transport-commons';
import express from '@feathersjs/express';

import {IotDataRoot} from "./src/IotData/iotData.root";
import {RooterRoot} from "./src/rooter/rooter.root";
import {SensorRoot} from "./src/sensor/sensor.root";
import {UserRoot} from "./src/user/user.root";

import {MongooseService} from "./src/services/mongoose.service";
import {authMiddleware} from "./src/services/auth.service";
import {AuthRoot} from "./src/auth/auth.root";

const mongooseInstance = MongooseService.getInstance();
mongooseInstance.connection()
    .then(() => console.log("Connection to database successful"));

// Creates an ExpressJS compatible Feathers application
const app = express(feathers());

// Express middleware to parse HTTP JSON bodies
app.use(express.json());
// Express middleware to parse URL-encoded params
app.use(express.urlencoded({ extended: true }));
// Express middleware to host static files from the current folder
app.use(express.static(__dirname));

// Add REST API support
app.configure(express.rest());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});

// Register root
app.use('/callback', new IotDataRoot());
app.use('/auth', new AuthRoot());

app.use('/rooter', new RooterRoot());
app.service('rooter').hooks({
    before: {
        all:[authMiddleware]
    }
})

app.use('/sensor', new SensorRoot());
app.service('sensor').hooks({
    before: {
        all:[authMiddleware]
    }
})

app.use('/user', new UserRoot());
app.service('user').hooks({
    before: {
        all:[authMiddleware]
    }
})


// Express middleware with a nicer error handler
app.use(express.errorHandler());

// Add any new real-time connection to the `everybody` channel
app.on('connection', connection =>
    app.channel('everybody').join(connection)
);

// Start the server
app.listen(3030).on('listening', () =>
    console.log('Feathers server listening on localhost:3030')
);

