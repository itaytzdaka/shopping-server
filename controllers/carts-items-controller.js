const express = require("express");
const cartsItemsLogic = require("../business-logic/carts-items-logic");
const CartItem = require("../models/cart-item");
const isLoggedIn = require("../middleware/is-logged-in");

const router = express.Router();

// GET all carts items - http://localhost:3000/api/cartsItems
router.get("/",isLoggedIn, async (request, response) => {
    try {
        const cartsItems = await cartsItemsLogic.getAllCartsItemsWithProductAndCartAsync();
        response.json(cartsItems);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// GET carts item by cart_id - http://localhost:3000/api/cartsItems/:_id
router.get("/:_id", isLoggedIn, async (request, response) => {
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

// POST cart - http://localhost:3000/api/cartsItems
router.post("/", isLoggedIn, async (request, response) => {
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

// PUT cart-item - http://localhost:3000/api/cartsItems/:_id
router.put("/:_id", isLoggedIn, async (request, response) => {
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

// DELETE cart item by cart-item_id - http://localhost:3000/api/cartsItems/:_id
router.delete("/:_id", isLoggedIn, async (request, response) => {
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

