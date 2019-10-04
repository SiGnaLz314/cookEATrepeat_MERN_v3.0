const router = require('express').Router();
let Recipe = require('../models/recipe.model');

// Route: /Recipe/
// GET Request
router.route('/').get((req, res) => {
    Recipe.find()
        .then(recipes => res.json(recipes))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Route: /Recipe/add
// POST Request
router.route('/add').post((req, res) => {
    const recipename = req.body.recipename;
    const animal = req.body.animal;
    const ingredients = req.body.ingredients;
    const instructions = req.body.instructions;
    const date = Date.parse(req.body.date);

    const newRecipe = new Recipe({
        recipename,
        animal,
        ingredients,
        instructions,
        date,
    });

    newRecipe.save()
        .then(() => res.json('Recipe Added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Route: /Recipe/:id
// GET Request
router.route('/:id').get((req, res) => {
    Recipe.findById(req.params.id)
        .then(recipe => res.json(recipe))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Route: /Recipe/:id
// DELETE Request
router.route('/:id').delete((req, res) => {
    Recipe.findByIdAndDelete(req.params.id)
        .then(() => res.json('Recipe Deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Route: /Recipe/update/:id
// POST Request
router.route('/update/:id').post((req, res) => {
    Recipe.findById(req.params.id)
        .then(recipe => {
            recipe.recipename = req.body.recipename;
            recipe.animal = req.body.animal;
            recipe.ingredients = req.body.ingredients;
            recipe.instructions = req.body.instructions;
            recipe.date = Date.parse(req.body.date);

            recipe.save()
                .then(() => res.json('Recipe Updated!'))
                .catch(err => res.status(400).json('Error: '+ err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;