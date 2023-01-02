// global.config = require("./config.json"); // Load once config.json file.
if (process.env.PORT) {
    global.config = require("./config-prod");
}
else {
    global.config = require("./config-dev");
}

// Connect once to MongoDB:
require("./data-access-layer/dal");


const express = require("express"); // Get Express.
const server = express(); // Create the server.


const cors = require("cors");
server.use(cors({
    credentials: true,
     origin: true,
     exposedHeaders: ['set-cookie']
}));

// server.use(cors({credentials: true, origin: true}));
const session = require("express-session");


const MongoDBSession = require("connect-mongodb-session")(session);

const connStr = config.mongodb.connectionString;
const store = new MongoDBSession({
    uri: connStr,
    collection: "mySessions",
});

server.use(
    session({
        secret: "key that will sign cookie", // Encryption key for the session id
        resave: false, // Start counting session time on each request.
        cookie: {
            secure: false,
            maxAge: 30*60*1000 //(60*1000 = 1 min)
        },
        saveUninitialized: false, // Don't create session automatically.
        store: store,
        // unset: 'destroy'
    })
);

const fs = require("fs");
// if "./uploads" doesn't exist: 
if (!fs.existsSync("./_front-end/uploads")) {
    fs.mkdirSync("./_front-end/uploads");
}

const fileUpload = require("express-fileupload");
// server.use(express.static(__dirname)); // "/" ==> "index.html"
server.use(fileUpload());

const path = require("path");
server.use(express.static(path.join(__dirname, "./_front-end")));   // "/" ==> "./_front-end/index.html"
// server.use(express.static(path.join(__dirname, "./uploads"))); 



const productsController = require("./controllers/products-controller"); // Get the Controller.
const citiesController = require("./controllers/cities-controller"); // Get the Controller.
const usersController = require("./controllers/users-controller"); // Get the Controller.
const categoriesController = require("./controllers/categories-controller"); // Get the Controller.
const cartsController = require("./controllers/carts-controller"); // Get the Controller.
const cartsItemsController = require("./controllers/carts-items-controller"); // Get the Controller.
const invitesController = require("./controllers/invites-controller"); // Get the Controller.
const imageController = require("./controllers/image-controller"); // Get the Controller.



server.use(express.json()); // Support JSON in the body.
server.use("/api/products", productsController); // If client request the root address - give the control to productsController router.
server.use("/api/cities", citiesController); // If client request the root address - give the control to productsController router.
server.use("/api/users", usersController); // If client request the root address - give the control to productsController router.
server.use("/api/categories", categoriesController); // If client request the root address - give the control to productsController router.
server.use("/api/carts", cartsController); // If client request the root address - give the control to productsController router.
server.use("/api/cartsItems", cartsItemsController); // If client request the root address - give the control to productsController router.
server.use("/api/invites", invitesController); // If client request the root address - give the control to productsController router.
server.use("/api/upload-image", imageController); // If client request the root address - give the control to productsController router.
server.use("*", (request, response) => response.sendStatus(404)); // On any other route - return 404 error.


server.use("*", (request, response) => { // "/*" ==> "./_front-end/index.html"
    response.sendFile(path.join(__dirname, "./_front-end/index.html"));
});

// Start the server:
const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Listening on port ${port}`));