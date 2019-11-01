import React, { Component } from 'react';
import axios from 'axios';

const Recipe = props => (
    <tr>
        <td>
            <a href={'/recipe/'+props.recipe._id}>
                <img id='recipe_img' alt='Not Available' src={`../uploads/${props.recipe.imagepath}`}></img>
            </a>
        </td>
    </tr>
)

export default class RecipesList extends Component {
    constructor(props) {
        super(props);

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

    recipeList(){
        return this.state.recipes.map(currentrecipe => {
            return <Recipe recipe={currentrecipe} key={currentrecipe.recipe_id} />;
        })
    }

    render() {
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