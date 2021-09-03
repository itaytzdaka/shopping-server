const CartItem = require("../models/cart-item");


function getAllCartsItemsAsync() {
    return CartItem.find().populate("product").populate("cart").exec(); // exec returns a Promise.
}

function getAllItemsOfCartAsync(_id) {
    return CartItem.find({ cartId: _id}).populate("product").populate("cart").exec(); // exec returns a Promise.
}

function addCartItemAsync(cartItemToAdd){
    return cartItemToAdd.save(); // save returns a Promise
}

// Update existing cart Item: 
async function updateCartItemAsync(cartItemToUpdate) {
    console.log("logic");
    const info = await CartItem.updateOne({ _id: cartItemToUpdate._id }, cartItemToUpdate).exec();
    return info.n ? cartItemToUpdate : null; // info.n === 0 means no product found to update!
}

function deleteCartItemAsync(_id) {
    return CartItem.deleteOne({ _id }).exec();
}

module.exports = {
    getAllCartsItemsAsync,
    // getAllCartsItemsWithProductAndCartAsync,
    getAllItemsOfCartAsync,
    addCartItemAsync,
    updateCartItemAsync,
    deleteCartItemAsync
};