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
    var ingredients = req.body.ingredients;
    var instructions = req.body.instructions;
    const imagepath = req.body.imagepath;
    const date = Date.parse(req.body.date);

    // FORMATTING FOR INPUT OF INSTRUCTIONS/INGREDIENTS
    // NEED TO DECIDE ON FORMATTING STILL
    //
    // ingredients = ingredients.split("\n");
    // instructions = instructions.split("\n");

    // for (var i = 0; i < ingredients.length; i++) {
    //     ingredients[i] = ingredients[i].replace(/(?:\\[rn]|[\r\n]+)+/g, "");
    //     ingredients[i] = "<li>" + ingredients[i] + "</li>";
    // }
    // for (var i = 0; i < instructions.length; i++) {
    //     instructions[i] = instructions[i].replace(/(?:\\[rn]|[\r\n]+)+/g, "");
    //     instructions[i] = "<li>" + instructions[i] + "</li>";
    // }
    // ingredients = ingredients.join('');
    // instructions = instructions.join('');

    const newRecipe = new Recipe({
        recipename,
        animal,
        ingredients,
        instructions,
        imagepath,
        date,
    });

    newRecipe.save()
        .then(() => res.status(200));
        // .then(() => res.json('Recipe Added!'))
        // .catch(err => res.status(400).json('Error: ' + err));
});

// Route: /Recipe/:id
// GET Request
router.route('/:id').get((req, res) => {
    Recipe.findOne({recipe_id: req.params.id})
        .then(recipe => res.json(recipe))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Route: /Recipe/:id
// DELETE Request
router.route('/:id').delete((req, res) => {
    Recipe.findOneAndRemove({ recipe_id: req.params.id})
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

            // FORMATTING FOR INPUT OF INSTRUCTIONS/INGREDIENTS
            // NEED TO DECIDE ON FORMATTING STILL
            //
            // recipe.ingredients = recipe.ingredients.split("\n");
            // recipe.instructions = recipe.instructions.split("\n");

            // for (var i = 0; i < recipe.ingredients.length; i++) {
            //     recipe.ingredients[i] = recipe.ingredients[i].replace(/(?:\\[rn]|[\r\n]+)+/g, "");
            //     recipe.ingredients[i] = "<li>" + recipe.ingredients[i] + "</li>";
            // }
            // for (var i = 0; i < recipe.instructions.length; i++) {
            //     recipe.instructions[i] = recipe.instructions[i].replace(/(?:\\[rn]|[\r\n]+)+/g, "");
            //     recipe.instructions[i] = "<li>" + recipe.instructions[i] + "</li>";
            // }
            // recipe.ingredients = recipe.ingredients.join('');
            // recipe.instructions = recipe.instructions.join('');


            recipe.save()
                .then(() => res.json('Recipe Updated!'))
                .catch(err => res.status(400).json('Error: '+ err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;