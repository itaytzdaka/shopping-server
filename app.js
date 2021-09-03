global.config = require("./config.json"); // Load once config.json file.

// Connect once to MongoDB:
require("./data-access-layer/dal");


const express = require("express"); // Get Express.
const cors = require("cors");
const fileUpload = require("express-fileupload");
const fs = require("fs");

// if "./uploads" doesn't exist: 
if (!fs.existsSync("./uploads")) {
    fs.mkdirSync("./uploads");
}

const server = express(); // Create the server.
server.use(express.static(__dirname)); // "/" ==> "index.html"
server.use(cors());
server.use(fileUpload());

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

server.listen(3000, () => console.log("Listening on http://localhost:3000")); // Load server to the air.
