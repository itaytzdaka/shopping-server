const express = require("express");
const userLogic = require("../business-logic/users-logic");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { route } = require("./invites-controller");
const hash = require("../helpers/hash");
const isLoggedIn = require("../middleware/is-logged-in");
const isAdmin = require("../middleware/is-admin");

const router = express.Router();

// GET all users Emails - http://localhost:3000/api/users
router.get("/getAllEmails",  async (request, response) => {
    try {
        const users = await userLogic.getAllUsersEmailsAsync();
        response.json(users);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// GET all users - http://localhost:3000/api/users
// router.get("/", async (request, response) => {
//     try {
//         const users = await userLogic.getAllUsersNamesIncludingCitiesAsync();
//         response.json(users);
//     }
//     catch (err) {
//         response.status(500).send(err.message);
//     }
// });


// POST a user - http://localhost:3000/api/users
router.post("/", async (request, response) => {
    try {
        const user = new User(request.body);
        // user.password=hash(user.password);

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

// POST logging a user - http://localhost:3000/api/users/login
router.post("/login", async (request, response) => {
    try {
        const credentials = request.body;
        // credentials.password=hash(credentials.password);

        console.log("credentials");
        console.log(credentials);

        const user = await userLogic.loginAsync(credentials);
        
        // console.log(user);
        if (!user) {
            response.status(401).send("Illegal username or password");
            return;
        }
        console.log(user);


        request.session.user=user;

        console.log(request.session.id);    
        console.log(request.session);    

        const token = jwt.sign({ user }, config.jwt.secretKey, { expiresIn: "30m" });
        // console.log(token);
        response.json({ user, token });
        // response.json(user);
    }
    catch (err) {
        console.log(err.message);
        response.status(500).send(err.message);
    }
});

// POST logout a user - http://localhost:3000/api/users/logout
router.post("/logout", (request, response)=>{
    console.log("logout");
    console.log(request.session);
    console.log(request.session.id);    
    // request.session.destroy();

    // request.session = null; 

    request.session.destroy((err)=>{
        if(err){
            console.log(err);
            throw err;
        }
    })

    console.log(request.session)


    // response.redirect("/home/login");
    response.end();
})

// GET session of user - http://localhost:3000/api/users/user
router.get("/user", (request, response)=>{
    request.session.user?  response.status(200).send(request.session.user) : response.status(200).send(null);
});



module.exports = router;

