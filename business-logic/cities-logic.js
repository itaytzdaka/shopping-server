const City = require("../models/city");

// Get all users names: 
function getAllCitiesAsync() {
    return City.find().exec(); // exec returns a Promise.
}

function addCity(cityToAdd){
    return cityToAdd.save(); // save returns a Promise
}

module.exports = {
    getAllCitiesAsync,
    addCity
};