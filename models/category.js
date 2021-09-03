const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
    name: String
},  {
    versionKey: false, // Don't add __v to a Product object
    toJSON: { virtuals: true }, // Allow to get a category for each product.
    id: false // Don't add additional id.
});

const Category = mongoose.model("Category", CategorySchema, "categories");

module.exports = Category;