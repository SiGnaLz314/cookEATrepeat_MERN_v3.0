// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';


/**
 * RecipeImages: List of Recipe Images
 * 
 * @param {recipe Object} props 
 */
const RecipeImages = (props):React.ChildrenArray<any> => {
    if(props.recipe.recipe_id){
        return(
        <div className="col-lg-6 box rec_img_box">
            <Link to={{
                pathname: '/recipe/' + props.recipe.recipe_id,
                state: {
                    recipeId: props.recipe.recipe_id,
                    recipe: props.recipe
                }
            }}>
                <img  id='recipe_img' alt="Not Available" src={`${props.recipe.imageURL}`} />
            </Link>
        </div>
        )
    }
}

const recipeImages = (recipes):React.ChildrenArray<React.Element<any>> => {
    return recipes.map(currentrecipe => <RecipeImages recipe={currentrecipe} key={currentrecipe.recipe_id} />)
}
// const welcome = (user, recipes) => {
//     let welcomeName = user.toString();
//     welcomeName = welcomeName.substring(0, welcomeName.indexOf('@'));
//     return (
//         <div>
//             <h3>cookEATrepeat Recipes</h3>
//             <h1>Welcome {welcomeName}!</h1>
//             <div id="recipe" className="container">
//                 {recipeImages(recipes)}
//             </div>
//         </div>
//     );
// }

/**
 * Home: Displays Recipes recieved from App as Props.
 * 
 * Displays username if user is Logged in.
 * 
 * @returns {DOM element} Displaying recipe images
 */
type Props = {
    user?: string | null,
    recipes: Array<{
        recipe_id: string,
        recipename?: string,
        ingredients?: string,
        instructions?: string,
        imageURL: string
    }>,
    admin?: boolean,
}
const Home = (props:Props):React.ChildrenArray<React.Element<any>> => {
    return (
        <div>
            <h3>cookEATrepeat Recipes</h3>
            <div id="recipe" className="container">
                {recipeImages(props.recipes)}
            </div>
        </div>
    )
}

export default Home;