import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/**
 * RecipeList: List of Recipe Images
 * 
 * @param {recipe Object} props 
 */
const RecipeList = props => (
    <div className="col-lg-6 box">
        <Link to={'/recipe/' + props.recipe.recipe_id}>
            <input type="image" id='recipe_img' alt="Not Available" src={`../uploads/${props.recipe.imagepath}`} />
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

    recipeList() {
        return this.props.recipes.map(currentrecipe => {
            return <RecipeList recipe={currentrecipe} key={currentrecipe.recipe_id} />;
        })
    }
    welcome(user) {
        console.log("Welcome User:", user);
        let welcomeName = user.toString();
        welcomeName = welcomeName.substring(0, welcomeName.indexOf('@'));
        return (
            <div>
                <h3>cookEATrepeat Recipes</h3>
                <h1>Welcome {welcomeName}!</h1>
                <div id="recipe" className="container">
                    {this.recipeList()}
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
                        {this.recipeList()}
                    </div>
                </div>
            )
        }
    }
}