const Product = require("../models/product");
const Category = require("../models/category");

// Get all products: 
function getAllProductsAsync() {
    return Product.find().populate("category").exec(); // exec returns a Promise.
}

// Get one product by ID: 
function getOneProductAsync(_id) {
    return Product.findOne({ _id }).exec();
}

//get count of all products
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



module.exports = {
    getAllProductsAsync,
    getOneProductAsync,
    getNumberOfProductsAsync,
    addProductAsync,
    updateProductAsync
};