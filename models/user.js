const mongoose = require("mongoose"); // npm i mongoose

// Creating Product Schema: 
const UserSchema = mongoose.Schema({

    // Don't specify _id in the schema, so the database will generate id

    email: {
        type: String,
        required: [true, "Missing email"],
        minlength: [5, "Name too short"],
        maxlength: [100, "Name too long"],

    },

    password: {
        type: String 
    },

    firstName: {
        type: String,
        required: [true, "Missing first Name"]
        // validate: { // Custom Validator
        //     validator: value => /^[A-Z].*$/.test(value),
        //     message: "First name must start with a capital letter"
        // }
    },

    lastName: {
        type: String,
        required: [true, "Missing last Name"],
        // validate: { // Custom Validator
        //     validator: value => /^[A-Z].*$/.test(value),
        //     message: "Last name must start with a capital letter"
        // }
    },

    identityNumber: {
        type: String,
        required: [true, "Missing identity number"]
    },

    // Foreign Key: 
    cityId: {
        type: mongoose.Schema.Types.ObjectId, // PK type.
        ref: "City" // The model this field is pointing to.
    },

    street: {
        type: String,
        required: [true, "Missing street"]
    },

    isAdmin: Number

}, {
    versionKey: false, // Don't add __v to a Product object
    toJSON: { virtuals: true }, // Allow to get a category for each product.
    id: false // Don't add additional id.
});

UserSchema.virtual("city", {
    ref: "City", // category model.
    localField: "cityId", // FK
    foreignField: "_id", // PK
    justOne: true // Each product has just one category (prevent array creation)
});

// Creating a Model (this is the class):
const User = mongoose.model("User", UserSchema, "users"); // Model Name, Schema Name, Collection Name

module.exports = User;
