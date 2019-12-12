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

    render() {
        return (
            <div className="SignupForm">
                <h1>Signup for access to cookEATrepeat</h1>
                <div className="form-group" id="u-pass">
                    <div className="col-auto">
                        <label htmlFor="firstName"></label>
                        <input className="form-control"
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
                        <input className="form-control"
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
                        <input className="form-control"
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
                        <input className="form-control"
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
                        <input className="form-control"
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
                        <button className="btn btn-primary col-mr-auto" onClick={this.handleSubmit}>
                            signup
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}