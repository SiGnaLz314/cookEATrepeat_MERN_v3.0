import React, { Component } from 'react';
import axios from 'axios';

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
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    
    handleSubmit(event) {
        event.preventDefault();
        
        if(this.state.password !== this.state.confirmPassword){
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
            if(!res.data.error) {
                console.log('Success!');
                this.props.history.push("/login");
            } else {
                alert(res.data.error);
            }
        })
        .catch(error =>{
            console.log("Error Signing up ", error);
        })
    }

    render() {
        return(
            <div className="SignupForm">
                <h1>Signup for access to cookEATrepeat</h1>
                <div className="form-group">
                    <label htmlFor="firstName">Firstname: </label>
                    <input type="text"
                        name="firstName"
                        placeholder="Firstname"
                        value={this.state.firstName}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Lastname: </label>
                    <input type="text"
                        name="lastName"
                        placeholder="Lastname"
                        value={this.state.lastName}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username: </label>
                    <input type="text"
                        name="username"
                        placeholder="Username"
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm: </label>
                    <input type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={this.state.confirmPassword}
                        onChange={this.handleChange}
                    />
                </div>
                <button className="btn btn-primary col-1 col-mr-auto" onClick={this.handleSubmit}>
                    Signup
                </button>
            </div>
        )
    }
}