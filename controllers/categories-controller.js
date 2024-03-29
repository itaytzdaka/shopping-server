const express = require("express");
const categoriesLogic = require("../business-logic/categories-logic");
const Category = require("../models/category");
const isLoggedIn = require("../middleware/is-logged-in");

const router = express.Router();

// GET all categories - http://localhost:3000/api/categories
router.get("/", async (request, response) => {
    try {
        const categories = await categoriesLogic.getAllCategories();
        response.json(categories);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// POST a category - http://localhost:3000/api/categories
router.post("/", isLoggedIn, async (request, response) => {
    try {
        const category = new Category(request.body);

        // Validate user data: 
        const error = await category.validate();
        if (error) {
            response.status(400).send(error.message);
            return;
        }

        const addedCategory = await categoriesLogic.addCategory(category);
        response.status(201).json(addedCategory);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;

