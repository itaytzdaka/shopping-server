const mongoose = require("mongoose"); // npm i mongoose

// Creating Product Schema: 
const ProductSchema = mongoose.Schema({

    // Don't specify _id in the schema, so the database will generate id

    name: {
        type: String,
        required: [true, "Missing name"],
        minlength: [3, "Name too short"],
        maxlength: [100, "Name too long"]
        // validate: { // Custom Validator
        //     validator: value => /^[A-Z].*$/.test(value),
        //     message: "Name must start with a capital letter"
        // }
    },

    price: {
        type: Number,
        required: [true, "Missing price"],
        min: [0, "Price can't be negative"],
        max: [1000, "Price can't exceed 1000"]
    },

    image: {
        type: String,
        required: [true, "Missing image"]
    },

    // Foreign Key: 
    categoryId: {
        type: mongoose.Schema.Types.ObjectId, // PK type.
        ref: "Category" // The model this field is pointing to.
    }

}, {
    versionKey: false, // Don't add __v to a Product object
    toJSON: { virtuals: true }, // Allow to get a category for each product.
    id: false // Don't add additional id.
});

ProductSchema.virtual("category", {
    ref: "Category", // category model.
    localField: "categoryId", // FK
    foreignField: "_id", // PK
    justOne: true // Each product has just one category (prevent array creation)
});

// Creating a Model (this is the class):
const Product = mongoose.model("Product", ProductSchema, "products"); // Model Name, Schema Name, Collection Name

module.exports = Product;
