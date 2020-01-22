const router = require('express').Router();
const uploadDocuments = require("../services/uploadDocuments");
const deleteDocuments = require("../services/deleteDocuments");

let Recipe = require('../models/recipe.model');

let bucketURL;
if (process.env.NODE_ENV === 'production') {
    bucketURL = process.env.AWS_PROD_BUCKET_URL
} else {
    bucketURL = process.env.AWS_DEV_BUCKET_URL
}


/**
 * Get: All Recipes in Database
 * 
 * @see home.component
 * @alias /
 */
router.route('/').get((req, res) => {
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
router.route('/add').post(
    uploadDocuments.single('file'),
    async (req, res, next) => {
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
            if(savedRecipe) return res.redirect('/');
            return next(new Error('Failed to save the Recipe'));
        }catch(err){
            if(req.file && req.file.storedFilename) {
                await deleteDocuments(imagepath);
            }
            return next(err);
        }   
    }
);


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
    Recipe.findOneAndUpdate({ recipe_id: req.body.recipe_id }, req.body)
        .then(() => res.json('Recipe Updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;