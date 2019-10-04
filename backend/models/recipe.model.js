const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recipeSchema = new Schema ({
    recipename: { type: String, required: true },
    animal: { type: String, required: true },
    ingredients: { type: String, required: true },
    instructions: { type: String, required: true },
    date: { type: Date, required: true },
},{
    timestamps: true,
});

const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe;