const mongoose = require("mongoose"); // npm i mongoose

// Creating Product Schema: 
const CitySchema = mongoose.Schema({

    // Don't specify _id in the schema, so the database will generate id

    name: {
        type: String,
        required: [true, "Missing City Name"],
        minlength: [3, "Name too short"],
        maxlength: [100, "Name too long"],

    }

},  {
    versionKey: false, // Don't add __v to a Product object
    toJSON: { virtuals: true }, // Allow to get a category for each product.
    id: false // Don't add additional id.
});


// Creating a Model (this is the class):
const City = mongoose.model("City", CitySchema, "cities"); // Model Name, Schema Name, Collection Name

module.exports = City;
