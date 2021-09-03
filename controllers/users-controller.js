const express = require("express");
const userLogic = require("../business-logic/users-logic");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const router = express.Router();

// GET all users Emails - http://localhost:3000/api/users
router.get("/getAllEmails", async (request, response) => {
    try {
        const users = await userLogic.getAllUsersEmailsAsync();
        response.json(users);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// GET all users - http://localhost:3000/api/users
router.get("/", async (request, response) => {
    try {
        const users = await userLogic.getAllUsersNamesIncludingCitiesAsync();
        response.json(users);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// POST user - http://localhost:3000/api/users
router.post("/", async (request, response) => {
    try {
        const user = new User(request.body);

        // Validate user data: 
        const error = await user.validate();
        if (error) {
            response.status(400).send(error.message);
            return;
        }

        const addedUser = await userLogic.addUserAsync(user);
        response.status(201).json(addedUser);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.post("/login", async (request, response) => {
    try {
        const credentials = request.body;
        console.log("credentials");
        console.log(credentials);
        const user = await userLogic.loginAsync(credentials);
        console.log(user);
        if (!user) {
            response.status(401).send("Illegal username or password");
            return;
        }

        const token = jwt.sign({ user }, config.jwt.secretKey, { expiresIn: "30m" });
        response.json({ user, token });
        // response.json(user);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});


module.exports = router;

