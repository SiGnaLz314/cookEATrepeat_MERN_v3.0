import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Recipe = props => (
    <tr>
        <td>{props.recipe.recipename}</td>
        <td>{props.recipe.animal}</td>
        <td>{props.recipe.ingredients}</td>
        <td>{props.recipe.instructions}</td>
        <td>{props.recipe.date.substring(0,10)}</td>
        <td><a href={'/recipe/'+props.recipe._id}>
            <img id='recipe_img' alt='Not Available' src={`../uploads/${props.recipe.imagepath}`}></img>
            </a>
        </td>
        <td>
            <button><Link to={"/edit/"+props.recipe._id}>edit</Link></button>
            <button href="#" onClick={() => { props.deleteRecipe(props.recipe.recipe_id) }}><Link to="#">delete</Link></button>
        </td>
    </tr>
)

export default class RecipesList extends Component {
    constructor(props) {
        super(props);

        this.deleteRecipe = this.deleteRecipe.bind(this);

        this.state = {
            recipes: [],
            documents: []
        };
    }

    componentDidMount() {
        
        axios.get('http://localhost:5000/recipes/')
        .then(res => {
            this.setState({
                recipes: res.data
            })
        });
    }

    deleteRecipe(id) {
        axios.all([
            axios.delete('http://localhost:5000/recipes/'+id),
            axios.delete('http://localhost:5000/fileUpload/'+id)
        ])
        .then(axios.spread((res1, res2) => {
            this.setState({
                recipes: this.state.recipes.filter(el => el.recipe_id !== id),
                documents: this.state.documents.filter(el => el.document_id !== id)
            })
        }));

    }

    recipeList(){
        return this.state.recipes.map(currentrecipe => {
            return <Recipe recipe={currentrecipe} deleteRecipe={this.deleteRecipe} key={currentrecipe.recipe_id} />;
        })
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
                        { this.recipeList() }
                    </tbody>
                </table>
            </div>
        )
    }
}