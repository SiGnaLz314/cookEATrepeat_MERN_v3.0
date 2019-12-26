import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import {FormErrors} from '../utils/FormErrors.util';

/**
 * Login: Handle user input and interaction on Login
 * 
 * @fires event:this.props_login()
 * 
 * @param {string} username
 * @param {string} password
 * @param {boolean} redirectTo
 * 
 * @returns Login Component, redirects user to location login was called from.
 */
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            redirectTo: false,
            formErrors: {username:'', password:''},
            usernameValid: false,
            passwordValid: false,
            formValid: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.validateField = this.validateField.bind(this);
        this.errorClass = this.errorClass.bind(this);
    }

    componentDidMount(){
        // Ensure component mounts at top of page.
        window.scrollTo(0, 0);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value},
            ()=>{ this.validateField(name, value)
        });
    }
    /**
     * handleSumbit: Passes results to props.setUser (method of App Component).
     * 
     * @fires event:POST 'http://localhost:5000/users/login'
     * 
     * @param {String} username 
     * @param {String} password
     * @param {Object} axiosConfig header properties for the http request
     */
    handleSubmit(event) {
        event.preventDefault();
        let axiosConfig = {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': 'http://localhost:3000/',
              'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
            }
          }
        axios.post('http://localhost:5000/users/login', { username:this.state.username, password:this.state.password }, axiosConfig)
            .then(res => {
                // console.log("APP Login: res", res);
                // console.log("APP Login: res.data", res.data);
                if (res.status === 200) {
                    var userInfo = {
                        loggedIn: true,
                        user: res.data.user
                    };
                    this.props.setUser({
                        userInfo
                    });
                    this.setState({
                        redirectTo: true,
                    })
                }
            })
            .catch(error => {
                console.log(`login error: ${error}`);
            })
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let usernameValid = this.state.usernameValid;
        let passwordValid = this.state.passwordValid;

        switch(fieldName) {
            case 'username':
                usernameValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.username = usernameValid ? '' : ' is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 4;
                fieldValidationErrors.password = passwordValid ? '' : ' is too short';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            usernameValid: usernameValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }
    validateForm() {
        this.setState({formValid: this.state.usernameValid && this.state.passwordValid});
    }
    errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
    }
    
    render() {
        const { from } = this.props.location || { from: { pathname: '/' } };
        const { redirectTo } = this.state;

        if (redirectTo === true) {
            return <Redirect to={from} />
        } else {
            return (
                <>
                <div className="panel panel-default">
                    <FormErrors formErrors={this.state.formErrors} />
                </div>

                <div className="LoginForm">
                    <h1>Login</h1>
                    <form>
                        <div id="u-pass" className={'form-group'}>
                            <div className="col-auto">
                                <label htmlFor="username"></label>
                                <input 
                                    className={`form-control ${this.errorClass(this.state.formErrors.username)}`}
                                    type="text"
                                    name="username"
                                    placeholder="user@email.com"
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <div id="u-pass" className="form-group">
                            <div className="col-auto">
                                <label htmlFor="password"></label>
                                <input
                                    className={`form-control ${this.errorClass(this.state.formErrors.password)}`}
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group ">
                            <div className="col-auto">
                                <button className="btn btn-primary col-mr-auto" 
                                    onClick={this.handleSubmit}
                                    disabled={!this.state.formValid}>
                                    Login
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                </>
            )
        }
    }

}
