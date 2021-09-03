const express = require("express");
const invitesLogic = require("../business-logic/invites-logic");
const Invite = require("../models/invite");
const { request, response } = require("express");

const router = express.Router();

// GET all invites - http://localhost:3000/api/cities
router.get("/", async (request, response) => {
    try {
        const invites = await invitesLogic.getAllInvitesWithUserAndCartAsync();
        response.json(invites);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// GET all invites - http://localhost:3000/api/cities
router.get("/deliveryFromToday", async (request, response) => {
    try {
        const date=new Date().toJSON();
        console.log("date");
        console.log(date);
        const invites = await invitesLogic.getAllInvitesFromDeliveryDateTillTodayAsync(date);
        response.json(invites);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// POST city - http://localhost:3000/api/cities
router.post("/", async (request, response) => {
    try {
        const invite = new Invite(request.body);
        // Validate user data: 
        const error = await invite.validate();
        if (error) {
            response.status(400).send(error.message);
            return;
        }
        
        const addedInvite = await invitesLogic.addInviteAsync(invite);
        response.status(201).json(addedInvite);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.get("/count",async (request,response)=>{
    try {
        const countOfInvites = await invitesLogic.getNumberOfInvitesAsync();
        response.json(countOfInvites);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
})

router.get("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        const invites = await invitesLogic.getAllInvitesOfUserAsync(_id);
        if (!invites) {
            response.sendStatus(404);
            return;
        }
        response.json(invites);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;

