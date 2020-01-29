import React from 'react';
import { Link } from 'react-router-dom';

/**
 * RecipeImages: List of Recipe Images
 * 
 * @param {recipe Object} props 
 */
const RecipeImages = (props) => (
    <div className="col-lg-6 box rec_img_box">
        <Link to={'/recipe/' + props.recipe.recipe_id}>
            <img  id='recipe_img' alt="Not Available" src={`${props.recipe.imageURL}`} />
        </Link>
    </div>
)

const recipeImages = (recipes) => {
    return recipes.map(currentrecipe => {
        return <RecipeImages recipe={currentrecipe} key={currentrecipe.recipe_id} />;
    })
}
const welcome = (user, recipes) => {
    let welcomeName = user.toString();
    welcomeName = welcomeName.substring(0, welcomeName.indexOf('@'));
    return (
        <div>
            <h3>cookEATrepeat Recipes</h3>
            <h1>Welcome {welcomeName}!</h1>
            <div id="recipe" className="container">
                {recipeImages(recipes)}
            </div>
        </div>
    );
}

/**
 * Home: Displays Recipes recieved from App as Props.
 * 
 * Displays username if user is Logged in.
 * 
 * @returns {DOM element} Displaying recipe images
 */
const Home = (props) => {
    if (props.user) {
        return (welcome(props.user, props.recipes))
    } else {
        return (
            <div>
                <h3>cookEATrepeat Recipes</h3>
                <div id="recipe" className="container">
                    {recipeImages(props.recipes)}
                </div>
            </div>
        )
    }
}

export default Home;