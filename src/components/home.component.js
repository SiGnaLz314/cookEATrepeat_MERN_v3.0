import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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

export default class Home extends Component {

    recipeList(){
        return this.props.recipes.map(currentrecipe => {
            return <RecipeList recipe={currentrecipe} key={currentrecipe.recipe_id} />;
        })
    }

    render() {
        if(this.props.user){
            return (
                <div>
                    <h3>cookEATrepeat Recipes</h3>
                    <h1>Welcome {this.props.user.username}!</h1>
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