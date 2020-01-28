const router = require('express').Router();
const uploadDocuments = require("../services/uploadDocuments");
const deleteDocuments = require("../services/deleteDocuments");

let Recipe = require('../models/recipe.model');
const RecipeController = require("../controllers/recipe.controller")(Recipe);



/**
 * Get: All Recipes in Database
 * 
 * @see home.component
 * @alias /
 */
router.route('/').get(RecipeController.GetRecipes);

/**
 * Post: Create Recipe
 * 
 * @see create-recipe.component
 * @alias /create
 */
router.route('/add').post(uploadDocuments.single('file'), RecipeController.AddRecipe);


/**
 * Get/id: Individual Recipe
 * 
 * Not used since state is raised and filtered by id.
 * 
 * Will remove
 */
router.route('/:id').get(RecipeController.GetRecipeById);

/**
 * Delete: Removes recipe from Database
 * 
 * @alias /recipes
 * @see recipes-list.component
 */
router.route('/delete/:id').delete(RecipeController.DeleteRecipe);

/**
 * Update: Update recipe in Database
 * 
 * @alias /edit/:id
 * @see edit-recipe.component
 */
router.route('/update/:id').post(RecipeController.UpdateRecipe);

module.exports = router;