import React, { Component } from 'react';
import axios from 'axios';
import { FormErrors } from '../utils/FormErrors.util'

/**
 * SignUp: Procures data from user.
 * 
 * Sends user data to backend.
 * 
 * @listens event:handleSubmit()
 * @fires event:handleSubmit()
 * 
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} username
 * @param {string} password
 * @param {string} confirmPassword
 */
export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: '',
            formErrors: {
                username:'', 
                firstName:'', 
                lastName:'', 
                password:''},
            usernameValid: false,
            firstNameValid: false,
            lastNameValid: false,
            passwordValid: false,
            confirmPassValid: false,
            formValid: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validateField = this.validateField.bind(this);
        this.errorClass = this.errorClass.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value},
            ()=>{ this.validateField(name, value)
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.password !== this.state.confirmPassword) {
            alert('Passwords do NOT Match!');
            return;
        }

        axios.post('http://localhost:5000/users/signup', {
            username: this.state.username,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
        })
            .then(res => {
                if (!res.data.error) {
                    this.props.history.push("/login");
                } else {
                    alert(res.data.error);
                }
            })
            .catch(error => {
                console.log("Error Signing up ", error);
            })
    }

    
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let usernameValid = this.state.usernameValid;
        let firstNameValid = this.state.firstNameValid;
        let lastNameValid = this.state.lastNameValid;
        let passwordValid = this.state.passwordValid;
        let confirmPassValid = this.state.confrimPassValid;

        switch(fieldName) {
            case 'username':
                usernameValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.username = usernameValid ? '' : ' is invalid';
                break;
            case 'firstName':
                firstNameValid = value.length >= 1;
                fieldValidationErrors.firstName = firstNameValid ? '' : ' requires at least 1 character';
                break;
            case 'lastName':
                lastNameValid = value.length >= 1;
                fieldValidationErrors.lastName = lastNameValid ? '' : ' requires at least 1 character';
                break;
            case 'password':
                passwordValid = value.length >= 4;
                fieldValidationErrors.password = passwordValid ? '' : ' is too short';
                break;
            case 'confirmPassword':
                confirmPassValid = value.length >= 4;
                fieldValidationErrors.confirmPassword = confirmPassValid ? '' : ' is invalid';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            usernameValid: usernameValid,
            firstNameValid: firstNameValid,
            lastNameValid: lastNameValid,
            passwordValid: passwordValid,
            confirmPassValid: confirmPassValid
        }, this.validateForm);
    }
    validateForm() {
        this.setState({
            formValid: 
                this.state.usernameValid 
                && this.state.passwordValid
                && this.state.firstNameValid
                && this.state.lastNameValid
                && this.state.confirmPassValid});
    }
    errorClass(error){
        return(error.length === 0 ? '' : 'has-error');
    }

    render() {
        return (
            <>
            <div className="panel panel-default">
                <FormErrors formErrors={this.state.formErrors} />
            </div>

            <div className="SignupForm">
                <h1>Signup for access to cookEATrepeat</h1>
                <div className="form-group" id="u-pass">
                    <div className="col-auto">
                        <label htmlFor="firstName"></label>
                        <input
                            className={`form-control ${this.errorClass(this.state.formErrors.firstName)}`}
                            type="text"
                            required
                            name="firstName"
                            placeholder="firstname"
                            value={this.state.firstName}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>
                <div className="form-group" id="u-pass">
                    <div className="col-auto">
                        <label htmlFor="lastName"></label>
                        <input 
                            className={`form-control ${this.errorClass(this.state.formErrors.lastName)}`}
                            type="text"
                            required
                            name="lastName"
                            placeholder="lastname"
                            value={this.state.lastName}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>
                <div className="form-group" id="u-pass">
                    <div className="col-auto">
                        <label htmlFor="username"></label>
                        <input
                            className={`form-control ${this.errorClass(this.state.formErrors.username)}`}
                            type="text"
                            required
                            name="username"
                            placeholder="username@email.com"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>
                <div className="form-group" id="u-pass">
                    <div className="col-auto">
                        <label htmlFor="password"></label>
                        <input
                            className={`form-control ${this.errorClass(this.state.formErrors.password)}`}
                            type="password"
                            required
                            name="password"
                            placeholder="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>
                <div className="form-group" id="u-pass">
                    <div className="col-auto">
                        <label htmlFor="confirmPassword"></label>
                        <input
                            className={`form-control ${this.errorClass(this.state.formErrors.password)}`}
                            type="password"
                            required
                            name="confirmPassword"
                            placeholder="confirm password"
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>
                <br />
                <div className="form-group">
                    <div className="col-auto">
                        <button className="btn btn-primary col-mr-auto" 
                            onClick={this.handleSubmit}
                            disabled={!this.state.formValid}>
                            signup
                        </button>
                    </div>
                </div>
            </div>
            </>
        )
    }
}