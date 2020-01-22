const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// library for handling autoincrement in mongoose
// https://github.com/ramiel/mongoose-sequence
const AutoIncrement = require("mongoose-sequence")(mongoose);

// Define RECIPE schema
// Declare Recipe.Objects
// declare their respective type and addt'l properites
const recipeSchema = new Schema(
{
    recipe_id: {
        type: Number,
        default: 0
    },
    recipename: {
        type: String,
        required: true
    },
    animal: {
        type: String,
        required: true
    },
    ingredients: {
        type: String,
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    imagepath: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
}, {
    collection: 'recipes'
});

recipeSchema.plugin(AutoIncrement, { inc_field: "recipe_id" });

const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe;