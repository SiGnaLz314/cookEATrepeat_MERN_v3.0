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
        <td>{props.recipe.ingredients.substring(0, 150)}...</td>
        <td>{props.recipe.instructions.substring(0, 150)}...</td>
        <td>{props.recipe.date.substring(0, 10)}</td>
        <td>
            <div className="rec_img_box">
                <Link to={'/recipe/' + props.recipe.recipe_id} >
                    <img id='recipe_img' type="image" alt="Not Available" src={`${props.recipe.imageURL}`} />
                </Link>
            </div>
        </td>
        <td>

            {/* Only Show to users logged in */}
            {props.loggedIn && props.admin ? (
                <>
                    <div id="recipe-action">
                        <button className="btn btn-outline-primary col-auto col-mr-auto">
                            <Link key={props.recipe.recipe_id} to={{ pathname: `/edit/${props.recipe.recipe_id}`, state: { recipe: props.recipe } }}>edit</Link>
                        </button>
                    </div>
                    <div id="recipe-action">
                        <button className="btn btn-outline-primary col-auto col-mr-auto" href="#" onClick={() => { props.deleteRecipe(props.recipe.recipe_id) }}>
                            <Link key={props.recipe.recipe_id} to="#">delete</Link>
                            {/* <button className="btn btn-outline-primary col-auto col-mr-auto" href="#" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) props.deleteRecipe(props.recipe.recipe_id) }}>
                            <Link key={props.recipe.recipe_id} to="#">delete</Link> */}
                        </button>
                    </div>
                </>
            ) : (
                    <></>
                )}
        </td>
    </tr>
)

/**
 * RecipeListDetailSmall: Manages individual Recipe Data.
 * 
 * Organizes and Displays Data recieved from recipeDetail().
 * Desgned for MOBILE RESPONSIVENESS
 * 
 * @see recipeListDetail()
 * 
 * @param {recipe object} props
 * 
 * @returns {DOM elements} Recipe Data in table row
 */
const RecipeListDetailSmall = props => (
    <tr>
        <td>{props.recipe.recipename}</td>
        <td>
            <div className="rec_img_box">
                <Link to={'/recipe/' + props.recipe.recipe_id} >
                    <img id='recipe_img' type="image" alt="Not Available" src={`${props.recipe.imageURL}`} />
                </Link>
            </div>
        </td>
        <td>
            {props.loggedIn && props.admin ? (
                <>
                    <div id="recipe-action">
                        <button className="btn btn-outline-primary col-auto col-mr-auto">
                            <Link key={props.recipe.recipe_id} to={{ pathname: `/edit/${props.recipe.recipe_id}`, state: { recipe: props.recipe } }}>edit</Link>
                        </button>
                    </div>
                    <div id="recipe-action">
                        <button className="btn btn-outline-primary col-auto col-mr-auto" href="#" onClick={() => { props.deleteRecipe(props.recipe.recipe_id) }}>
                            <Link key={props.recipe.recipe_id} to="#">delete</Link>
                            {/* <button className="btn btn-outline-primary col-auto col-mr-auto" href="#" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) props.deleteRecipe(props.recipe.recipe_id) }}>
            <Link key={props.recipe.recipe_id} to="#">delete</Link> */}
                        </button>
                    </div>
                </>
            ) : (
                    <></>
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
                this.props.updateRecipes();
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
        let width = window.innerWidth;
        let rList;
        if (width >= 600) {
            rList = this.props.recipes.map(currentrecipe => {
                return <RecipeListDetail
                    recipe={currentrecipe}
                    location={this.props.location}
                    deleteRecipe={this.deleteRecipe}
                    key={currentrecipe.recipe_id}
                    loggedIn={this.props.loggedIn}
                    admin={this.props.admin}
                    width={width}
                />;
            })
        } else {
            rList = this.props.recipes.map(currentrecipe => {
                return <RecipeListDetailSmall
                    recipe={currentrecipe}
                    location={this.props.location}
                    deleteRecipe={this.deleteRecipe}
                    key={currentrecipe.recipe_id}
                    loggedIn={this.props.loggedIn}
                    admin={this.props.admin}
                    width={width}
                />;
            })
        }
        return rList;
    }

    render() {
        let width = window.innerWidth;
        if (width >= 600) {
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
        } else {
            return (
                <div>
                    <h3>cookEATrepeat Recipes</h3>
                    <table className="table">
                        <thead className="thead-light">
                            <tr>
                                <th>Recipe</th>
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
}