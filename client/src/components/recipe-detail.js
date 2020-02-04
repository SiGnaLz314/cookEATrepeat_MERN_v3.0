import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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
        <div id="recipe-title" className="row">
            <h1>
                {props.recipe.recipename}
            </h1>
        </div>
        <div className="column">
            <img id="recipe_detail_img" alt="Not Available" src={`${props.recipe.imageURL}`} />
            <div>
                <h3>Algorithm:</h3>
                <div className="recipe_detail_box">
                    <div id="recipe_detail">
                        {props.recipe.instructions}
                    </div>
                </div>
            </div>
        </div>
        <div className="column">
            <h3>Variables:</h3>
            <div className="recipe_detail_box">
                <div id="recipe_detail">
                    {props.recipe.ingredients}
                </div>
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
    componentDidMount() {
        // Ensure component mounts at top of page.
        window.scrollTo(0, 0);
    }

    recipe() {
        const recipeDetail = this.props.location.state.recipe
        if (recipeDetail) {
            return <Recipe recipe={recipeDetail} key={recipeDetail.recipe_id} />;
        } else {
            return <Redirect path="*" to="/" />
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