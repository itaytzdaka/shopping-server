const mongoose = require("mongoose");

const InviteSchema = mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId, // PK type.
        ref: "User" // The model this field is pointing to.
    },
    cartId: {
        type: mongoose.Schema.Types.ObjectId, // PK type.
        ref: "Cart" // The model this field is pointing to.
    },
    cartPrice: Number,
    cityId: {
        type: mongoose.Schema.Types.ObjectId, // PK type.
        ref: "City" // The model this field is pointing to.
    },
    street: {
        type: String,
        required: [true, "Missing name"],
        minlength: [3, "Name too short"],
        maxlength: [100, "Name too long"],
        // validate: { // Custom Validator
        //     validator: value => /^[A-Z].*$/.test(value),
        //     message: "Name must start with a capital letter"
        // }
    },
    orderDate: {
        type: String,
        required: [true, "Missing name"]
    },
    deliveryDate: {
        type: String,
        required: [true, "Missing name"]
    },
    creditCard: {
        type: String,
        required: [true, "Missing name"]
    }
}, {
    versionKey: false, // Don't add __v to a Product object
    toJSON: { virtuals: true }, // Allow to get a category for each product.
    id: false // Don't add additional id.
});

InviteSchema.virtual("user", {
    ref: "User", // category model.
    localField: "userId", // FK
    foreignField: "_id", // PK
    justOne: true // Each product has just one category (prevent array creation)
});

InviteSchema.virtual("cart", {
    ref: "Cart", // category model.
    localField: "cartId", // FK
    foreignField: "_id", // PK
    justOne: true // Each product has just one category (prevent array creation)
});

InviteSchema.virtual("city", {
    ref: "City", // category model.
    localField: "cityId", // FK
    foreignField: "_id", // PK
    justOne: true // Each product has just one category (prevent array creation)
});


const Invite = mongoose.model("Invite", InviteSchema, "invite");

module.exports = Invite;