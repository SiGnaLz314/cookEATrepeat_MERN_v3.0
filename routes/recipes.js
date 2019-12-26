const router = require('express').Router();
const path = require('path');
const fs = require("fs");

let Recipe = require('../models/recipe.model');

/**
 * Get: All Recipes in Database
 * 
 * @see home.component
 * @alias http://localhost:3000/
 */
router.route('/').get((req, res) => {
    // console.log("Session Debugging:");
    // console.log("Recipe Request Session ID: ", req.sessionID);
    // console.log("Recipe Request Session: ", req.session);
    // console.log("Recipe Request _passport: ", req._passport);
    Recipe.find()
        .then(recipes => res.json(recipes))
        .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * Post: Create Recipe
 * 
 * @see create-recipe.component
 * @alias http://localhost:3000/create
 */
router.route('/add').post((req, res) => {
    const recipename = req.body.recipename;
    const animal = req.body.animal;
    let ingredients = req.body.ingredients;
    let instructions = req.body.instructions;
    const imagepath = req.body.imagepath;
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
});

/**
 * Get/id: Individual Recipe
 * 
 * Not used since state is raised and filtered by id.
 * 
 * Will remove
 */
router.route('/:id').get((req, res) => {
    Recipe.findOne({recipe_id: req.params.id})
        .then(recipe => res.json(recipe))
        .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * Delete: Removes recipe from Database
 * 
 * @alias http://localhost:3000/recipes
 * @see recipes-list.component
 */
router.route('/delete/:id').delete((req, res) => {
    Recipe.findOneAndRemove({ recipe_id: req.params.id}, (err, result)=>{
            if (err) {
                return next(err);
            }
            const target_path = path.join(__dirname, '../../public/uploads/') + result.imagepath;
            fs.unlink(target_path, function() {
                res.json('Recipe Deleted Successfully');
            });    
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * Update: Update recipe in Database
 * 
 * @alias http://localhost:3000/edit/:id
 * @see edit-recipe.component
 */
router.route('/update/:id').post((req, res) => {
    // console.log("Recipe Update POST Request: ", req);
    Recipe.findOneAndUpdate({recipe_id: req.body.recipe_id}, req.body)
        .then(() => res.json('Recipe Updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;