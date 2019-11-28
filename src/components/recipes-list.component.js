import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RecipeDetail = props => (
    <tr>
        <td>{props.recipe.recipename}</td>
        <td>{props.recipe.animal}</td>
        <td>{props.recipe.ingredients}</td>
        <td>{props.recipe.instructions}</td>
        <td>{props.recipe.date.substring(0,10)}</td>
        <td>
            <Link to={'/recipe/'+props.recipe.recipe_id} >
                <button>
                    <img id='recipe_img' alt='Not Available' src={`../uploads/${props.recipe.imagepath}`}></img>
                </button>
            </Link>
        </td>
        <td>
            <button className="btn btn-outline-primary col-auto col-mr-auto">
                <Link key={props.recipe.recipe_id} to={ `/edit/${props.recipe.recipe_id}`}>edit</Link>
            </button>
            <button className="btn btn-outline-primary col-auto col-mr-auto" href="#" onClick={() => { props.deleteRecipe(props.recipe.recipe_id) }}>
                <Link key={props.recipe.recipe_id} to="#">delete</Link>
            </button>
        </td>
    </tr>
)

export default class RecipesList extends Component {
    constructor(props) {
        super(props);

        this.deleteRecipe = this.deleteRecipe.bind(this);
    }

    
    deleteRecipe(id) {
        axios.delete('http://localhost:5000/recipes/delete'+id)
        .then((res) => {
            this.setState({
                recipes: this.props.recipes.filter(el => el.recipe_id !== id),
            })
        });

    }
    
    recipeDetail(){
        const rList = this.props.recipes.map(currentrecipe => {
            return <RecipeDetail recipe={currentrecipe} location={this.props.location} deleteRecipe={this.deleteRecipe} key={currentrecipe.recipe_id} />;
        }) 
        return rList;
    }

    render() {
        return (
            <div>
                <h3>cookEATrepeat Recipes</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                        <th>Recipe</th>
                        <th>Animal</th>
                        <th>Ingredients</th>
                        <th>Instructions</th>
                        <th>Date</th>
                        <th>Recipe Image</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.recipeDetail() }
                    </tbody>
                </table>
            </div>
        )
    }
}