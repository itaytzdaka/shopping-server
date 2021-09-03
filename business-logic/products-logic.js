const Product = require("../models/product");
const Category = require("../models/category");

// Get all products: 
function getAllProductsAsync() {
    return Product.find().populate("category").exec(); // exec returns a Promise.
}

// Get one product: 
function getOneProductAsync(_id) {
    return Product.findOne({ _id }).exec();
}

function getNumberOfProductsAsync(){
    return Product.countDocuments().exec();
}

// Add new Product: 
function addProductAsync(productToAdd) {
    return productToAdd.save(); // save returns a Promise
}

// Update existing product: 
async function updateProductAsync(productToUpdate) {
    const info = await Product.updateOne({ _id: productToUpdate._id }, productToUpdate).exec();
    return info.n ? productToUpdate : null; // info.n === 0 means no product found to update!
}

// // Delete existing product: 
// function deleteProductAsync(_id) {
//     return Product.deleteOne({ _id }).exec();
// }

// // Get cheaper products than a max price: 
// function getCheapestProductsAsync(maxPrice) {
//     // return Product.find({ name: "Chai"}).exec();
//     // return Product.find({ price: maxPrice}).exec();
//     // return Product.find({ name: "Chai", price: maxPrice }).exec();

//     // MongoDB Query Language: 
//     // $lt  Less Than
//     // $gt  Greater Than
//     // $lte Less Than or Equal
//     // $gte Greater Than or Equal
//     // $ne  Not Equal
//     // $eq  Equal
//     // $in  In Array
//     // $nin Not in Array
//     // $regex   Regex Expression
//     return Product.find({ price: { $lte: maxPrice }}).exec();
// }

// // Get price range products:
// function getPriceRangeProductsAsync(minPrice, maxPrice) {
//     return Product.find({ price: { $gte: minPrice, $lte: maxPrice }}).exec();
// }

// function getProductsIncludingCategoryAsync() {
//     return Product.find().populate("category").exec();
// }

module.exports = {
    getAllProductsAsync,
    getOneProductAsync,
    getNumberOfProductsAsync,
    addProductAsync,
    updateProductAsync
    // addProductAsync,
    // updateProductAsync,
    // deleteProductAsync,
    // getCheapestProductsAsync,
    // getPriceRangeProductsAsync,
    // getProductsIncludingCategoryAsync
};