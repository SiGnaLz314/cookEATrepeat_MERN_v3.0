import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

/**
 * EditRecipe: Component to Assist in updating the Ingredients/Instructions
 * 
 * @fires event:onSubmit Send updated Recipe data to database.
 */
export default class EditRecipe extends Component {
    constructor(props) {
        super(props);

        let url = window.location.pathname;
        let id = url.substring(url.lastIndexOf('/') + 1);

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);

        this.state = {
            recipename: '',
            animal: '',
            ingredients: '',
            instructions: '',
            date: new Date(),
            recipe_id: id,
        }
    }

    componentDidMount() {
        // Ensure component mounts at top of page.
        window.scrollTo(0, 0);
        var recipe_props = this.props.location.state.recipe;
        this.setState({
            recipename: recipe_props.recipename,
            animal: recipe_props.animal,
            ingredients: recipe_props.ingredients,
            instructions: recipe_props.instructions,
        })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const recipe = {
            recipename: this.state.recipename,
            animal: this.state.animal,
            ingredients: this.state.ingredients,
            instructions: this.state.instructions,
            date: this.state.date,
            recipe_id: this.state.recipe_id,
        }

        axios.post('/api/recipes/update/' + recipe.recipe_id, recipe)
            .then(res => {
                this.props.history.push('/');
            })
    }
    render() {
        return (
            <div>
                <h3>EditRecipe Recipe</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="recipename">Recipe Name:</label>
                        <input type="text"
                            required
                            name="recipename"
                            className="form-control"
                            value={this.state.recipename}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="animal">Animal Type:</label>
                        <select ref="userInput"
                            required
                            name="animal"
                            className="form-control"
                            value={this.state.animal}
                            onChange={this.handleChange}>
                            <option value="beef">Beef</option>
                            <option value="chicken">Chicken</option>
                            <option value="dessert">Dessert</option>
                            <option value="pork">Pork</option>
                            <option value="seafood">Seafood</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="ingredients">Variables: </label>
                        <textarea className="form-control"
                            required
                            name="ingredients"
                            rows="3"
                            cols="50"
                            placeholder="Variables"
                            value={this.state.ingredients}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form--group">
                        <label htmlFor="instructions">Algorithm: </label>
                        <textarea className="form-control"
                            required
                            name="instructions"
                            rows="3"
                            cols="50"
                            placeholder="Algorithm"
                            value={this.state.instructions}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Date: </label>
                        <div>
                            <DatePicker
                                name="date"
                                selected={this.state.date}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Edit Recipe" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}