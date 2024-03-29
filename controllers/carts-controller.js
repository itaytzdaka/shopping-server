const express = require("express");
const cartsLogic = require("../business-logic/carts-logic");
const Cart = require("../models/cart");
const isLoggedIn = require("../middleware/is-logged-in");

const router = express.Router();

// GET all carts - http://localhost:3000/api/carts
router.get("/",isLoggedIn, async (request, response) => {
    try {
        const carts = await cartsLogic.getAllCartsAsync();
        response.json(carts);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});



// POST cart - http://localhost:3000/api/carts
router.post("/",isLoggedIn, async (request, response) => {
    try {
        console.log("create a new cart");
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

// Get carts of user - http://localhost:3000/api/carts/:_id

router.get("/:_id",isLoggedIn, async (request, response) => {
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

