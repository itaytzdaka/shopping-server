const express = require("express");
const cartsLogic = require("../business-logic/carts-logic");
const Cart = require("../models/cart");

const router = express.Router();

// GET all cities names - http://localhost:3000/api/cities
router.get("/", async (request, response) => {
    try {
        const carts = await cartsLogic.getAllCartsAsync();
        response.json(carts);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});



// POST city - http://localhost:3000/api/cities
router.post("/", async (request, response) => {
    try {
        const cart = new Cart(request.body);

        // Validate user data: 
        const error = await cart.validate();
        if (error) {
            response.status(400).send(error.message);
            return;
        }

        const addedCart = await cartsLogic.addCartAsync(cart);
        response.status(201).json(addedCart);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});


router.get("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        const carts = await cartsLogic.getAllCartsOfUserAsync(_id);
        if (!carts) {
            response.sendStatus(404);
            return;
        }
        response.json(carts);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;

