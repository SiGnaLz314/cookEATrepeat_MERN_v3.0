import React, { Component } from 'react';
import axios from 'axios';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
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
            password: this.state.password
        }).then(res => {
            console.log(res);
            if(!res.data.errmsg) {
                console.log('Success!');
                this.props.history.push("/login");
            } else {
                console.log('Error Signing Up. User already exists with that username');
            }
        }).catch(error =>{
            console.log("Error Signing up ", error);
        })
    }

    render() {
        return(
            <div className="SignupForm">
                <h1>Signup for access to cookEATrepeat</h1>
                <label htmlFor="username">Username:</label>
                <input type="text"
                    name="username"
                    placeholder="Email"
                    value={this.state.username}
                    onChange={this.handleChange}
                />
                <label htmlFor="password">Password:</label>
                <input type="password"
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleChange}
                />
                <input type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={this.state.confirmPassword}
                    onChange={this.handleChange}
                />
                <button className="btn btn-primary col-1 col-mr-auto" onClick={this.handleSubmit}>
                    Signup
                </button>
            </div>
        )
    }
}