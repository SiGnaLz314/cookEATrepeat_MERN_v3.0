import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

/**
 * RecipeListDetail: Manages individual Recipe Data.
 * 
 * Organizes and Displays Data recieved from recipeDetail().
 * 
 * @see recipeListDetail()
 * 
 * @param {recipe object} props
 * 
 * @returns {DOM elements} Recipe Data in table row
 */
const RecipeListDetail = props => (
    <tr>
        <td>{props.recipe.recipename}</td>
        <td>{props.recipe.animal}</td>
        <td><div id="data-long">{props.recipe.ingredients.substring(0,150)}...</div></td>
        <td><div id="data-long">{props.recipe.instructions.substring(0,150)}...</div></td>
        <td>{props.recipe.date.substring(0, 10)}</td>
        <td>
            <Link to={'/recipe/' + props.recipe.recipe_id} >
                <input type="image" alt="Not Available" id='recipe_img' src={`../uploads/${props.recipe.imagepath}`} />
            </Link>
        </td>
        <td>
            <div id="recipe-action">
                <button className="btn btn-outline-primary col-auto col-mr-auto">
                    <Link key={props.recipe.recipe_id} to={{ pathname: `/edit/${props.recipe.recipe_id}`, state: { recipe: props.recipe } }}>edit</Link>
                </button>
            </div>
            {/* Only Show to users logged in */}
            {props.loggedIn ? (
                <div id="recipe-action">
                    <button className="btn btn-outline-primary col-auto col-mr-auto" href="#" onClick={() => { props.deleteRecipe(props.recipe.recipe_id) }}>
                        <Link key={props.recipe.recipe_id} to="#">delete</Link>
                        {/* <button className="btn btn-outline-primary col-auto col-mr-auto" href="#" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) props.deleteRecipe(props.recipe.recipe_id) }}>
                <Link key={props.recipe.recipe_id} to="#">delete</Link> */}
                    </button>
                </div>
            ) : (
                    <div></div>
                )}
        </td>
    </tr>
)

/**
 * RecipeList: Manages List of Recipes contained in props from App.js
 * 
 * @see RecipeListDetail
 * 
 * @param {recipes object} props
 * 
 * @returns {DOM Table} populated with RecipeListDetail  
 */
export default class RecipesList extends Component {
    constructor(props) {
        super(props);

        this.deleteRecipe = this.deleteRecipe.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);

    }

    componentDidMount() {
        // Ensure component mounts at top of page.
        window.scrollTo(0, 0);
    }

    /**
     * deleteRecipe(id): removes from database
     * 
     * @param {id} recipe_id
     */
    deleteRecipe(id) {
        axios.delete('/api/recipes/delete/' + id)
            .then(() => {
                this.props.removeRecipe(id);
            })
            .catch((err) => {
                console.log(`Error Deleting Recipe: ${err}`);
            });
    }

    /**
     * recipeListDetail: Map each recipe contained in props to currentrecipe
     * 
     * @see RecipeListDetail
     * 
     * @return List of <RecipeListDetail> elements with Recipe Data organized in table rows.
     */
    recipeListDetail() {
        const rList = this.props.recipes.map(currentrecipe => {
            return <RecipeListDetail recipe={currentrecipe} location={this.props.location} deleteRecipe={this.deleteRecipe} key={currentrecipe.recipe_id} loggedIn={this.props.loggedIn} />;
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
                        {this.recipeListDetail()}
                    </tbody>
                </table>
            </div>
        )
    }
}