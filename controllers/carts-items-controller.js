const express = require("express");
const cartsItemsLogic = require("../business-logic/carts-items-logic");
const CartItem = require("../models/cart-item");

const router = express.Router();

// GET all carts items names - http://localhost:3000/api/cities
router.get("/", async (request, response) => {
    try {
        const cartsItems = await cartsItemsLogic.getAllCartsItemsWithProductAndCartAsync();
        response.json(cartsItems);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.get("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        const cartItems = await cartsItemsLogic.getAllItemsOfCartAsync(_id);
        if (!cartItems) {
            response.sendStatus(404);
            return;
        }
        response.json(cartItems);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// POST city - http://localhost:3000/api/cities
router.post("/", async (request, response) => {
    try {
        console.log("request.body");
        console.log(request.body);
        const cartItem = new CartItem(request.body);
        // Validate user data: 
        const error = await cartItem.validate();
        if (error) {
            response.status(400).send(error.message);
            return;
        }
        
        const addedCartItem = await cartsItemsLogic.addCartItemAsync(cartItem);
        response.status(201).json(addedCartItem);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// PUT cart item
router.put("/:_id", async (request, response) => {
    try {
        const cartItem = new CartItem(request.body);
        cartItem._id = request.params._id;

        // Validate user data: 
        const error = await cartItem.validate();
        if (error) {
            response.status(400).send(error.message);
            return;
        }
        const updatedCartItem = await cartsItemsLogic.updateCartItemAsync(cartItem);

        if (!updatedCartItem) {
            response.sendStatus(404);
            return;
        }
        response.json(updatedCartItem);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.delete("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        await cartsItemsLogic.deleteCartItemAsync(_id);
        response.sendStatus(204);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;

