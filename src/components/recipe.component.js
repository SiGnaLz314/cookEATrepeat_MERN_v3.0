import React, { Component } from 'react';
import 'react-router';

/**
 * Recipe: Individual Recipe Ingredients and Instructions
 * 
 * @param {recipe Object} props 
 *
 * @returns {DOM elements} Recipe Image, Ingredients and Instructions
 */
const Recipe = props => (
    <>
    <div className="row">
        <h1>
            {props.recipe.recipename}
        </h1>
    </div>
    <div className="column">
        <img id="recipe_detail_img" alt="Not Available" src={`../uploads/${props.recipe.imagepath}`}/>
        <div>
            <h3>Algorithm:</h3>
            <div id="recipe_detail">
                {props.recipe.instructions}
            </div>
        </div>
    </div>
    <div className="column">
        <h3>Variables:</h3>
        <div id="recipe_detail">
            {props.recipe.ingredients}
        </div>
    </div>
    </>
)

/**
 * RecipeDetail: Granular detail of a recipe.
 * 
 * @param {recipe object} props Contains the properties of only one Recipe.
 * 
 * @see Recipe
 * 
 * @returns {DOM elements}
 */
export default class RecipeDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recipe: [],
        }
    }
    
     recipe(){
        const rList = this.props.recipes
        if(rList.length > 0){
            // Array.find() returns the first occurence found
            const recipe = rList.find(el => el.recipe_id.toString() === window.location.pathname.substring(8));
            return <Recipe recipe={recipe} deleteRecipe={this.deleteRecipe} key={recipe.recipe_id} />;
        } else {
            this.props.history.push('/');
        }
    }

    render() {
        return (
        <>
            {this.recipe()}
        </>
        )
    }
}