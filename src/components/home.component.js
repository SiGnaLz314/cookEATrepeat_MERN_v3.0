import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Recipe = props => (
    <tr>
        <td>
            <Link to={'/recipe/'+props.recipe._id}>
                <button>
                    <img id='recipe_img' alt='Not Available' src={`../uploads/${props.recipe.imagepath}`}></img>
                </button>
            </Link>
        </td>
    </tr>
)

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.componentDidMount = this.componentDidMount.bind(this);

        this.state = {
            recipes: []
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