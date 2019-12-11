import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

/**
 * RecipeDetail: Manages individual Recipe Data.
 * 
 * Organizes and Displays Data recieved from recipeDetail().
 * 
 * @see recipeDetail()
 * 
 * @param {recipe object} props
 * 
 * @returns {DOM elements} Recipe Data in table row
 */
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
                <Link key={props.recipe.recipe_id} to={{ pathname: `/edit/${props.recipe.recipe_id}`, state:{ recipe: props.recipe }}}>edit</Link>
            </button>
            <button className="btn btn-outline-primary col-auto col-mr-auto" href="#" onClick={() => { props.deleteRecipe(props.recipe.recipe_id) }}>
                <Link key={props.recipe.recipe_id} to="#">delete</Link>
            {/* <button className="btn btn-outline-primary col-auto col-mr-auto" href="#" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) props.deleteRecipe(props.recipe.recipe_id) }}>
                <Link key={props.recipe.recipe_id} to="#">delete</Link> */}
            </button>
        </td>   
    </tr>
)

/**
 * RecipeList: Manages List of Recipes contained in props from App.js
 * 
 * @see RecipeDetail
 * 
 * @param {recipes object} props
 * 
 * @returns {DOM Table} populated with RecipeDetail  
 */
export default class RecipesList extends Component {
    constructor(props) {
        super(props);
        
        this.deleteRecipe = this.deleteRecipe.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);

    }

    componentDidMount(){
        // Ensure component mounts at top of page.
        window.scrollTo(0, 0);
    }

    /**
     * deleteRecipe(id): removes from database
     * 
     * @param {id} recipe_id
     */
    deleteRecipe(id) {
        axios.delete('http://localhost:5000/recipes/delete/'+id )
        .then(() => {
            this.props.removeRecipe(id);
        })
        .catch((err) => {
            console.log(`Error Deleting Recipe: ${err}`);
        });

    }
    // REASON: Removing Document from DB
    // deleteRecipe(id) {
    //     axios.all([
    //         axios.delete('http://localhost:5000/recipes/'+id),
    //         axios.delete('http://localhost:5000/fileUpload/'+id)
    //     ])
    //     .then(axios.spread((res1, res2) => {
    //         this.setState({
    //             recipes: this.props.recipes.filter(el => el.recipe_id !== id),
    //         })
    // }));
    
    /**
     * recipeDetail: Map each recipe contained in props to currentrecipe
     * 
     * @see RecipeDetail
     * 
     * @return List of <RecipeDetail> elements with Recipe Data organized in table rows.
     */
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