const CartItem = require("../models/cart-item");


function getAllCartsItemsAsync() {
    return CartItem.find().populate("product").populate("cart").exec(); // exec returns a Promise.
}

//get all items of specific cart by cart_id
function getAllItemsOfCartAsync(_id) {
    return CartItem.find({ cartId: _id}).populate("product").populate("cart").exec(); // exec returns a Promise.
}

//add a new item for specific cart
function addCartItemAsync(cartItemToAdd){
    return cartItemToAdd.save(); // save returns a Promise
}

// update a specific item in the cart, like the amount of this item in the cart for example
async function updateCartItemAsync(cartItemToUpdate) {
    const info = await CartItem.updateOne({ _id: cartItemToUpdate._id }, cartItemToUpdate).exec();
    return info.n ? cartItemToUpdate : null; // info.n === 0 means no product found to update!
}

// delete an item from the user cart
function deleteCartItemAsync(_id) {
    return CartItem.deleteOne({ _id }).exec();
}

module.exports = {
    getAllCartsItemsAsync,
    getAllItemsOfCartAsync,
    addCartItemAsync,
    updateCartItemAsync,
    deleteCartItemAsync
};