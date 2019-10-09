import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Recipe = props => (
        <>
            <td>{props.recipe.recipename}</td>
            <td>{props.recipe.animal}</td>
            <td>{props.recipe.ingredients}</td>
            <td>{props.recipe.instructions}</td>
            <td>{props.recipe.date.substring(0,10)}</td>
            <td>
                <button><Link to={"/edit/"+props.recipe._id}>edit</Link></button> |
                <button href="#" onClick={() => { props.deleteRecipe(props.recipe.recipe_id) }}><Link to="#">delete</Link></button>
            </td>
        </>
)

const Doc = props => (
        <td><img alt='Description...' src={require('../uploads/' + props.document.path)} width='200px' height='200px'></img></td>
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
        axios.all([
            axios.get('http://localhost:5000/recipes/'),
            axios.get('http://localhost:5000/fileUpload/')
        ])
        .then(axios.spread((res1, res2) => {    
            this.setState({
                recipes: res1.data,
                documents: res2.data
            })
        }));
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

    recipeImageList(){
        return this.state.documents.map(currentdoc => {
            return <Doc document={currentdoc} key={currentdoc.document_id} />;
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
                        <th>Actions</th>
                        <th>Img Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            { this.recipeList() }
                            { this.recipeImageList() }
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}