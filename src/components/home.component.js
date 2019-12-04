import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/**
 * RecipeList: List of Recipe Images
 * 
 * @param {recipe Object} props 
 */
const RecipeList = props => (
    <tr>
        <td>
            <Link to={'/recipe/'+props.recipe.recipe_id}>
                <button>
                    <img id='recipe_img' alt='Not Available' src={`../uploads/${props.recipe.imagepath}`}></img>
                </button>
            </Link>
        </td>
    </tr>
)

/**
 * Home: Displays Recipes recieved from App as Props.
 * 
 * Displays username if user is Logged in.
 * 
 * @returns {DOM element} Displaying recipe images
 */
export default class Home extends Component {

    recipeList(){
        return this.props.recipes.map(currentrecipe => {
            return <RecipeList recipe={currentrecipe} key={currentrecipe.recipe_id} />;
        })
    }

    render() {
        if(this.props.user){
                let userName = this.props.user;
                userName = userName.substring(0, userName.indexOf('@'));
            return (
                <div>
                    <h3>cookEATrepeat Recipes</h3>
                    <h1>Welcome {userName}!</h1>
                    <table className="table">
                        <tbody>
                            { this.recipeList() }
                        </tbody>
                    </table>
                </div>
            )
        } else {
            return (
                <div>
                    <h3>cookEATrepeat Recipes</h3>
                    <table className="table">
                        <tbody>
                            { this.recipeList() }
                        </tbody>
                    </table>
                </div>
            )
        }
    }
}