const express = require("express");
const productsLogic = require("../business-logic/products-logic");
const Product = require("../models/product");
const isLoggedIn = require("../middleware/is-logged-in");
const { route } = require("./invites-controller");

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

router.get("/count",async (request,response)=>{
    try {
        const countOfProducts = await productsLogic.getNumberOfProductsAsync();
        response.json(countOfProducts);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
})

// GET one product - http://localhost:3000/api/products/7
router.get("/:_id", async (request, response) => {
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
router.post("/", async (request, response) => {
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

// PUT product
router.put("/:_id", async (request, response) => {
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

// // PATCH product - http://localhost:3000/api/products/7
// router.patch("/:_id", async (request, response) => {
//     try {
//         const product = new Product(request.body);
//         product._id = request.params._id;

//         // Validate user data: 
//         const error = await product.validate();
//         if (error) {
//             response.status(400).send(error.message);
//             return;
//         }

//         const updatedProduct = await productsLogic.updateProductAsync(product);
//         if (!updatedProduct) {
//             response.sendStatus(404);
//             return;
//         }
//         response.json(updatedProduct);
//     }
//     catch (err) {
//         response.status(500).send(err.message);
//     }
// });

// // DELETE product - http://localhost:3000/api/products/7
// router.delete("/:_id", async (request, response) => {
//     try {
//         const _id = request.params._id;
//         await productsLogic.deleteProductAsync(_id);
//         response.sendStatus(204);
//     }
//     catch (err) {
//         response.status(500).send(err.message);
//     }
// });

// // GET cheaper products - http://localhost:3000/api/products/cheaper-than/35.79
// router.get("/cheaper-than/:maxPrice", async (request, response) => {
//     try {
//         const maxPrice = +request.params.maxPrice;
//         const products = await productsLogic.getCheapestProductsAsync(maxPrice);
//         response.json(products);
//     }
//     catch (err) {
//         response.status(500).send(err.message);
//     }
// });

// // GET price range products - http://localhost:3000/api/products/price-range/10/20
// router.get("/price-range/:minPrice/:maxPrice", async (request, response) => {
//     try {
//         const minPrice = +request.params.minPrice;
//         const maxPrice = +request.params.maxPrice;
//         const products = await productsLogic.getPriceRangeProductsAsync(minPrice, maxPrice);
//         response.json(products);
//     }
//     catch (err) {
//         response.status(500).send(err.message);
//     }
// });

// // GET all products including category - http://localhost:3000/api/products/join/products-including-category
// router.get("/join/products-including-category", async (request, response) => {
//     try {
//         const products = await productsLogic.getProductsIncludingCategoryAsync();
//         response.json(products);
//     }
//     catch (err) {
//         response.status(500).send(err.message);
//     }
// });

module.exports = router;

