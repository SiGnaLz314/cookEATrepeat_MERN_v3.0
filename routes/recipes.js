const router = require('express').Router();
const path = require('path');
const fs = require("fs");
const uploadDocuments = require("../services/uploadDocuments");
const deleteDocuments = require("../services/deleteDocuments");
const aws = require('aws-sdk');

let Recipe = require('../models/recipe.model');


// Setup AWS connection
aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: process.env.AWS_REGION
});

const s3 = new aws.S3();




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
router.route('/add').post(uploadDocuments.single('file'), async (req, res, next) => {
    try{
        const recipename = req.body.recipename;
        const animal = req.body.animal;
        const ingredients = req.body.ingredients;
        const instructions = req.body.instructions;
        const imagepath = req.file.originalname;
        const date = Date.parse(req.body.date);

        console.log('FileName:', req.file.originalname);

        const newRecipe = new Recipe({
            recipename,
            animal,
            ingredients,
            instructions,
            imagepath,
            date,
        });
        const savedRecipe = await newRecipe.save();
        if(savedRecipe) return res.redirect('/');
        return next(new Error('Failed to save the Recipe'));
    }catch(err){
        if(req.file && req.file.storedFilename) {
            await deleteDocuments(imagepath);
        }
        return next(err);
    }   
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
        deleteDocuments(result);
    })
    .then(() => res.json('Recipe Deleted!'))
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