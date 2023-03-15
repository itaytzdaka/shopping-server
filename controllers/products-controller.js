const express = require("express");
const productsLogic = require("../business-logic/products-logic");
const Product = require("../models/product");
const isLoggedIn = require("../middleware/is-logged-in");
const isAdmin = require("../middleware/is-admin");

const router = express.Router();
// router.use(isLoggedIn);

// GET all products - http://localhost:3000/api/products
router.get("/", async (request, response) => {
    try {
        const products = await productsLogic.getAllProductsAsync();
        response.json(products);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// GET number of products - http://localhost:3000/api/products/count
router.get("/count", async (request,response)=>{
    try {
        const countOfProducts = await productsLogic.getNumberOfProductsAsync();
        response.json(countOfProducts);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
})

// GET one product by product_id - http://localhost:3000/api/products/:_id
router.get("/:_id", isLoggedIn ,  async (request, response) => {
    try {
        const _id = request.params._id;
        const product = await productsLogic.getOneProductAsync(_id);
        if (!product) {
            response.sendStatus(404);
            return;
        }
        response.json(product);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});


// POST product - http://localhost:3000/api/products
router.post("/", isAdmin, async (request, response) => {
    try {
        const product = new Product(request.body);

        // Validate user data: 
        const error = await product.validate();
        if (error) {
            response.status(400).send(error.message);
            return;
        }

        const addedProduct = await productsLogic.addProductAsync(product);
        response.status(201).json(addedProduct);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// PUT product by product_id - http://localhost:3000/api/products/:_id
router.put("/:_id", isAdmin, async (request, response) => {
    try {
        const product = new Product(request.body);
        product._id = request.params._id;

        // Validate user data: 
        const error = await product.validate();
        if (error) {
            response.status(400).send(error.message);
            return;
        }

        const updatedProduct = await productsLogic.updateProductAsync(product);
        if (!updatedProduct) {
            response.sendStatus(404);
            return;
        }
        response.json(updatedProduct);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});


module.exports = router;

