import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


export default class CreateRecipe extends Component {
    constructor(props) {
        super(props);

        this.onChangeRecipename = this.onChangeRecipename.bind(this);
        this.onChangeAnimaltype = this.onChangeAnimaltype.bind(this);
        this.onChangeIngredients = this.onChangeIngredients.bind(this);
        this.onChangeInstructions = this.onChangeInstructions.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            recipename: '',
            animal: 'beef',
            ingredients: '',
            instructions: '',
            date: new Date(),
        }
    }

    onChangeRecipename(e) {
        this.setState({
            recipename: e.target.value
        });
    }
    
    onChangeAnimaltype(e) {
        this.setState({
            animal: e.target.value
        });
    }
    
    onChangeIngredients(e) {
        this.setState({
            ingredients: e.target.value
        });
    }
    onChangeInstructions(e) {
        this.setState({
            instructions: e.target.value
        });
    }
    onChangeDate(date) {
        this.setState({
            date: date
        });
    }
    
    onSubmit(e){
        e.preventDefault();

        const recipe = {
            recipename: this.state.recipename,
            animal: this.state.animal,
            ingredients: this.state.ingredients,
            instructions: this.state.instructions,
            date: this.state.date
        }

        console.log(recipe);

        axios.post('http://localhost:5000/recipes/add', recipe)
            .then(res => console.log(res.data))
        
        window.location = '/file';
    }
    render() {
        return (
            <div>
                <h3>Create Recipe</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Recipe Name:</label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.recipename}
                            onChange={this.onChangeRecipename}
                        />
                    </div>
                    <div className="form-group">
                        <label>Animal Type:</label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.animal}
                            onChange={this.onChangeAnimaltype}>
                                <option value="beef">Beef</option>
                                <option value="chicken">Chicken</option>
                                <option value="dessert">Dessert</option>
                                <option value="pork">Pork</option>
                                <option value="seafood">Seafood</option>
                            </select>
                    </div>
                    <div className="form-group">
                        <label>Ingredients: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.ingredients}
                            onChange={this.onChangeIngredients}
                        />
                    </div>
                    <div className="form--group">
                        <label>Instructions: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.instructions}
                            onChange={this.onChangeInstructions}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Recipe" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}