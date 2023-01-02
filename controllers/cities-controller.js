const express = require("express");
const cityLogic = require("../business-logic/cities-logic");
const City = require("../models/city");
const isLoggedIn = require("../middleware/is-logged-in");

const router = express.Router();

// GET all cities names - http://localhost:3000/api/cities
router.get("/", async (request, response) => {
    try {
        const cities = await cityLogic.getAllCitiesAsync();
        response.json(cities);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// POST a city - http://localhost:3000/api/cities
router.post("/", isLoggedIn, async (request, response) => {
    try {
        const city = new City(request.body);

        // Validate user data: 
        const error = await city.validate();
        if (error) {
            response.status(400).send(error.message);
            return;
        }

        const addedCity = await cityLogic.addCity(city);
        response.status(201).json(addedCity);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;

