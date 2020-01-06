import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/**
 * RecipeImages: List of Recipe Images
 * 
 * @param {recipe Object} props 
 */
const RecipeImages = props => (
    <div className="col-lg-6 box">
        <Link to={'/recipe/' + props.recipe.recipe_id}>
            <img id='recipe_img' alt="Not Available" src={`../uploads/${props.recipe.imagepath}`} />
        </Link>
    </div>
)

/**
 * Home: Displays Recipes recieved from App as Props.
 * 
 * Displays username if user is Logged in.
 * 
 * @returns {DOM element} Displaying recipe images
 */
export default class Home extends Component {

    recipeImages() {
        return this.props.recipes.map(currentrecipe => {
            return <RecipeImages recipe={currentrecipe} key={currentrecipe.recipe_id} />;
        })
    }
    welcome(user) {
        let welcomeName = user.toString();
        welcomeName = welcomeName.substring(0, welcomeName.indexOf('@'));
        return (
            <div>
                <h3>cookEATrepeat Recipes</h3>
                <h1>Welcome {welcomeName}!</h1>
                <div id="recipe" className="container">
                    {this.recipeImages()}
                </div>
            </div>
        );
    }

    render() {
        if (this.props.user) {
            return (this.welcome(this.props.user))
        } else {
            return (
                <div>
                    <h3>cookEATrepeat Recipes</h3>
                    <div id="recipe" className="container">
                        {this.recipeImages()}
                    </div>
                </div>
            )
        }
    }
}