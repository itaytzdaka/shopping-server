const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({

    date: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId, // PK type.
        ref: "User" // The model this field is pointing to.
    }
},{
    versionKey: false, // Don't add __v to a Product object
    toJSON: { virtuals: true }, // Allow to get a category for each product.
    id: false // Don't add additional id.
});

CartSchema.virtual("user", {
    ref: "User", // category model.
    localField: "userId", // FK
    foreignField: "_id", // PK
    justOne: true // Each product has just one category (prevent array creation)
});

const Cart = mongoose.model("Cart", CartSchema, "carts");

module.exports = Cart;