const mongoose = require("mongoose");

const CartItemSchema = mongoose.Schema({

    productId: {
        type: mongoose.Schema.Types.ObjectId, // PK type.
        ref: "Product" // The model this field is pointing to.
    },
    cartId: {
        type: mongoose.Schema.Types.ObjectId, // PK type.
        ref: "Cart" // The model this field is pointing to.
    },
    amount: Number
    // totalPrice: Number

}, {
    versionKey: false, // Don't add __v to a Product object
    toJSON: { virtuals: true }, // Allow to get a category for each product.
    id: false // Don't add additional id.
});

CartItemSchema.virtual("product", {
    ref: "Product", // category model.
    localField: "productId", // FK
    foreignField: "_id", // PK
    justOne: true // Each product has just one category (prevent array creation)
});

CartItemSchema.virtual("cart", {
    ref: "Cart", // category model.
    localField: "cartId", // FK
    foreignField: "_id", // PK
    justOne: true // Each product has just one category (prevent array creation)
});


const CartItem = mongoose.model("CartItem", CartItemSchema, "cartsItems");

module.exports = CartItem;