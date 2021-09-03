const Cart = require("../models/cart");

// Get all users names: 
function getAllCartsAsync() {
    return Cart.find().populate("user").sort("date").exec(); // exec returns a Promise.
}

function getAllCartsOfUserAsync(_id) {
    return Cart.find({ userId: _id}).populate("user").sort("date").exec(); // exec returns a Promise.
}

function addCartAsync(cartToAdd){
    return cartToAdd.save(); // save returns a Promise
}

module.exports = {
    getAllCartsAsync,
    getAllCartsOfUserAsync,
    addCartAsync
};