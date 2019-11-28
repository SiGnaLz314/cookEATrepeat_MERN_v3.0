import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import googleButton from '../stylesheets/google/btn_google_signin_dark_normal_web.png';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            redirectTo: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('Submit');
        this.props._login(this.state.username, this.state.password);
        this.setState({
            redirectTo: true,
        });
    }

    render(){
        const {from} = this.props.location || {from: {pathname: '/'}};
        const { redirectTo } = this.state;

        if(redirectTo === true) {
            return <Redirect to={from} />
        } else {
            return (
                <div className="LoginForm">
                    <h1>Login</h1>
                    <form>
                    <div className="form-group">
                        <label htmlFor="username">Username: </label>
                        <input type="text"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                        </div>
                        <div className="form-group">
                        <label htmlFor="password">Password: </label>
                        <input type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                        </div>
                        <button className="btn btn-primary col-1 col-mr-auto" onClick={this.handleSubmit}>
                            Login
                        </button>
                        <a href="/users/google">
                            {/* <GoogleButton /> */}
                            <img src={googleButton} alt="sign into Google Button" />
    					</a>
                    </form>
                </div>
            )
        }
    }

}
