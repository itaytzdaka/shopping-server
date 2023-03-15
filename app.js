//if development, load .env file
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// Connect once to MongoDB:
require("./data-access-layer/dal");


const express = require("express"); // Get Express.
const server = express(); // Create the server.


const cors = require("cors"); 
server.use(cors({
    credentials: true, //for alow passing cookies from client to server
    origin: "http://localhost:4200", // Allow requests from this origin
    //  exposedHeaders: ['set-cookie']
}));

const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);

const store = new MongoDBSession({ //config mongoDBSession for saving sessions at mongoDB collection.
    uri: process.env.MONGODB_CONNECTION_STRING,
    collection: "mySessions",
});

server.use( //save session as a cookie in the client and in the DB
    session({
        secret: "key that will sign cookie", // Encryption key for the session id
        resave: false, // Start counting session time on each request.
        cookie: {
            secure: false, // cookie will only be set over an https connection.
            maxAge: 30*60*1000 //the session time, the cookie will be kept also if the user closes the browser.(60*1000 = 1 min)
        },
        saveUninitialized: false, // Don't create request.session automatically.
        store: store, //save sessions at DB collection
    })
);

const fs = require("fs");
if (!fs.existsSync("./_front-end/uploads")) {
    fs.mkdirSync("./_front-end/uploads"); // If "./uploads" doesn't exist, create "uploads" folder.
}

const fileUpload = require("express-fileupload");
server.use(fileUpload()); // support sending files at the request

const path = require("path");
server.use(express.static(path.join(__dirname, "./_front-end")));   //serve "/_front-end" folder as a root "/" route.



const productsController = require("./controllers/products-controller"); // Get the Controller.
const citiesController = require("./controllers/cities-controller"); // Get the Controller.
const usersController = require("./controllers/users-controller"); // Get the Controller.
const categoriesController = require("./controllers/categories-controller"); // Get the Controller.
const cartsController = require("./controllers/carts-controller"); // Get the Controller.
const cartsItemsController = require("./controllers/carts-items-controller"); // Get the Controller.
const invitesController = require("./controllers/invites-controller"); // Get the Controller.
const imageController = require("./controllers/image-controller"); // Get the Controller.



server.use(express.json()); // Support JSON in the requests, let us use "req.body".
server.use("/api/products", productsController); // If client request the root address - give the control to productsController router.
server.use("/api/cities", citiesController); // If client request the root address - give the control to productsController router.
server.use("/api/users", usersController); // If client request the root address - give the control to productsController router.
server.use("/api/categories", categoriesController); // If client request the root address - give the control to productsController router.
server.use("/api/carts", cartsController); // If client request the root address - give the control to productsController router.
server.use("/api/cartsItems", cartsItemsController); // If client request the root address - give the control to productsController router.
server.use("/api/invites", invitesController); // If client request the root address - give the control to productsController router.
server.use("/api/upload-image", imageController); // If client request the root address - give the control to productsController router.
server.use("/api/*", (request, response) => response.sendStatus(404)); // On any other api route - return 404 error.


server.use("*", (request, response) => { //serve "index.html" for any other route
    response.sendFile(path.join(__dirname, "./_front-end/index.html"));
});

// Start the server:
const port = process.env.PORT || 3000; //if development, serve at port 3000
server.listen(port, () => console.log(`Listening on port ${port}`)); // the server listening to requests now