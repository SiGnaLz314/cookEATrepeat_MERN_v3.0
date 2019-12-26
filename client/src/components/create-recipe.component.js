import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { FormErrors } from '../utils/FormErrors.util';

import "react-datepicker/dist/react-datepicker.css";

const endpoint = "/api/upload/image/";


/**
 * CreateRecipe: Component to assist in adding a new recipe to the database.
 * 
 * File and Form are handled seperately.
 * 
 * @fires event:handleSelectedFile 
 * @fires event:onSubmit Sends File as FormData and User info as Object.
 * 
 */
export default class CreateRecipe extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSelectedFile = this.handleSelectedFile.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.validateField = this.validateField.bind(this);

        this.state = {
            recipename: '',
            animal: 'beef',
            ingredients: '',
            instructions: '',
            description: "",
            selectedFile: null,
            image: '',
            imagepath: '',
            date: new Date(),

            formErrors: {
                recipename: '',
                ingredients: '',
                instructions: '',
                description: '',
            },
            nameValid: false,
            ingredientsValid: false,
            instructionsValid: false,
            descriptionValid: false,
        }
    }

    componentDidMount() {
        // Ensure component mounts at top of page.
        window.scrollTo(0, 0);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) }
        );
    }

    handleSelectedFile(e) {
        e.preventDefault();
        this.setState({
            description: e.target.value,
            selectedFile: e.target.files[0],
            imagepath: e.target.files[0].name,
            image: URL.createObjectURL(e.target.files[0])
        });
    };

    onSubmit(e) {
        e.preventDefault();
        const recipe = {
            recipename: this.state.recipename,
            animal: this.state.animal,
            ingredients: this.state.ingredients,
            instructions: this.state.instructions,
            imagepath: this.state.imagepath,
            date: this.state.date
        }

        let data = new FormData(e.target);
        data.append("file", this.state.selectedFile, this.state.description);

        axios.all([
            axios.post('/api/recipes/add', recipe),
            axios.post(endpoint, data)
        ])
            .then(axios.spread((resRecipe, resUpload) => {
                this.props.addRecipe(recipe);
            }))
            .catch(error => {
                console.log("Error Adding Recipe", error);
            })
            .then(this.props.history.push("/"));
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let nameValid = this.state.nameValid;
        let ingredientsValid = this.state.ingredientsValid;
        let instructionsValid = this.state.instructionsValid;
        let descriptionValid = this.state.descriptionValid;

        switch (fieldName) {
            case 'recipename':
                nameValid = value.length >= 1;
                fieldValidationErrors.recipename = nameValid ? '' : ' is invalid';
                break;
            case 'ingredients':
                ingredientsValid = value.length >= 1;
                fieldValidationErrors.ingredients = ingredientsValid ? '' : ' is too short';
                break;
            case 'instructions':
                instructionsValid = value.length >= 1;
                fieldValidationErrors.instructions = instructionsValid ? '' : ' is too short';
                break;
            case 'description':
                descriptionValid = value.length >= 1;
                fieldValidationErrors.description = descriptionValid ? '' : ' is too short';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            nameValid: nameValid,
            ingredientsValid: ingredientsValid,
            instructionsValid: instructionsValid,
            descriptionValid: descriptionValid,
        }, this.validateForm);
    }
    validateForm() {
        this.setState({
            formValid:
                this.state.usernameValid
                && this.state.passwordValid
                && this.state.ingredientsValid
                && this.state.instructionsValid
                && this.state.descriptionValid
        });
    }

    render() {
        return (
            <>
                <div className="panel panel-default">
                    <FormErrors formErrors={this.state.formErrors} />
                </div>

                <div>
                    <h3>Create Recipe</h3>
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
                                <option value="lamb">Lamb</option>
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
                            <label htmlFor="description">Description:</label>
                            <input
                                required
                                type="text"
                                className="form-control"
                                name="description"
                                onChange={this.handleChange}
                                placeholder="Description"
                            />
                        </div>

                        <div className="form-group">
                            <input
                                required
                                type="file"
                                name=""
                                id=""
                                onChange={this.handleSelectedFile}
                            />
                        </div>
                        <div>
                            <img alt="" src={this.state.image} width='200px' height='200px' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="date" >Date: </label>
                            <div>
                                <DatePicker
                                    name="date"
                                    selected={this.state.date}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Create Recipe" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
            </>
        )
    }
}