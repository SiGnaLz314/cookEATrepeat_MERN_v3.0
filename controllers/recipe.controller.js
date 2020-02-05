// @flow
"use strict";
const deleteDocuments = require('../services/deleteDocuments')

let bucketURL;
if (process.env.NODE_ENV === 'production') {
    bucketURL = process.env.AWS_PROD_BUCKET_URL
    // console.log('production: ', process.env.NODE_ENV)
    // console.log('production bucket: ', bucketURL)
} else {
    bucketURL = process.env.AWS_DEV_BUCKET_URL
    // console.log('dev: ', process.env.NODE_ENV)
    // console.log('dev bucket: ', bucketURL)
}

let RecipeCtrl = (Recipe) => {
    let RecipeObj = {};

    RecipeObj.GetRecipes = (req, res, next) =>{
        Recipe.find()
            .then(recipes => res.json(recipes))
            .catch(err => res.status(400).json('Error: ' + err));
    }

    RecipeObj.AddRecipe = async (req, res, next) => {
        try{
            const recipename = req.body.recipename;
            const animal = req.body.animal;
            const ingredients = req.body.ingredients;
            const instructions = req.body.instructions;
            const imagepath = req.file.originalname;
            const imageURL = bucketURL + req.file.originalname;
            const date = Date.parse(req.body.date);

            const newRecipe = new Recipe({
                recipename,
                animal,
                ingredients,
                instructions,
                imagepath,
                imageURL,
                date,
            });
            const savedRecipe = await newRecipe.save();
            if(savedRecipe) 
                return res.redirect('/');
            return next(new Error('Failed to save the Recipe'));
        }catch(err){
            if(req.file && req.file.storedFilename) {
                await deleteDocuments(imagepath);
            }
            return next(err);
        }   
    }

    RecipeObj.GetRecipeById = (req, res, next) => {
        Recipe.findOne({ recipe_id: req.params.id })
            .then(recipe => res.json(recipe))
            .catch(err => res.status(400).json('Error: ' + err));
    }

    RecipeObj.DeleteRecipe = (req, res, next) => {
            Recipe.findOneAndRemove({ recipe_id: req.params.id }, (err, result) => {
                if (err) {
                    return next(err);
                }
                deleteDocuments(result);
            })
            .then(() => res.json('Recipe Deleted!'))
            .catch(err => res.status(400).json('Error: ' + err));
    }

    RecipeObj.UpdateRecipe = (req, res, next) => {
        Recipe.findOneAndUpdate({ recipe_id: req.body.recipe_id }, req.body)
            .then(() => res.json('Recipe Updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
    }

    return RecipeObj;
}

module.exports = RecipeCtrl;