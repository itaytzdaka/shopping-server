const Category = require("../models/category");

// Get all users names: 
function getAllCategories() {
    return Category.find().exec(); // exec returns a Promise.
}

function addCategory(categoryToAdd){
    return categoryToAdd.save(); // save returns a Promise
}

module.exports = {
    getAllCategories,
    addCategory
};