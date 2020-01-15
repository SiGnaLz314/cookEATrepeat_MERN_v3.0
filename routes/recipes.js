const router = require('express').Router();
const path = require('path');
const fs = require("fs");
const uploadDocuments = require("./uploadDocuments");

let Recipe = require('../models/recipe.model');

/**
 * Get: All Recipes in Database
 * 
 * @see home.component
 * @alias /
 */
router.route('/').get((req, res) => {
    // console.log("Mongo DB Debugging:");
    // console.log("Recipe Request: ", req)
    Recipe.find()
        .then(recipes => res.json(recipes))
        .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * Post: Create Recipe
 * 
 * @see create-recipe.component
 * @alias /create
 */
router.route('/add').post((req, res) => {
    uploadDocuments(req, res, err => {
        if (err) {
            console.log("Error after Routing, please try again !!");
        } else {
            if (req.file == undefined) {
                console.log("Error on File, no file was selected");
            } else {
                const recipename = req.body.recipename;
                const animal = req.body.animal;
                let ingredients = req.body.ingredients;
                let instructions = req.body.instructions;
                const imagepath = req.file.filename;
                const date = Date.parse(req.body.date);

                const newRecipe = new Recipe({
                    recipename,
                    animal,
                    ingredients,
                    instructions,
                    imagepath,
                    date,
                });

                newRecipe.save()
                    .then(() =>
                        res.send({
                            status: "200",
                            responseType: "string",
                            response: "success"
                        })
                    )
                    .catch(err => res.status(400).json('Error: ' + err));
            }
        }
    });
});


/**
 * Get/id: Individual Recipe
 * 
 * Not used since state is raised and filtered by id.
 * 
 * Will remove
 */
router.route('/:id').get((req, res) => {
    Recipe.findOne({ recipe_id: req.params.id })
        .then(recipe => res.json(recipe))
        .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * Delete: Removes recipe from Database
 * 
 * @alias /recipes
 * @see recipes-list.component
 */
router.route('/delete/:id').delete((req, res) => {
    Recipe.findOneAndRemove({ recipe_id: req.params.id }, (err, result) => {
        if (err) {
            return next(err);
        }
        const target_path = path.join(__dirname, '../../public/uploads/') + result.imagepath;
        fs.unlink(target_path, function () {
            res.json('Recipe Deleted Successfully');
        });
    })
        .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * Update: Update recipe in Database
 * 
 * @alias /edit/:id
 * @see edit-recipe.component
 */
router.route('/update/:id').post((req, res) => {
    // console.log("Recipe Update POST Request: ", req);
    Recipe.findOneAndUpdate({ recipe_id: req.body.recipe_id }, req.body)
        .then(() => res.json('Recipe Updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;