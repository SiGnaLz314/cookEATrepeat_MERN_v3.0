import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

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
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount(){
        // Ensure component mounts at top of page.
        window.scrollTo(0, 0);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
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
                }
            })
            .catch(error => {
                console.log(`login error: ${error}`);
            })
            this.setState({
                redirectTo: true,
            });
    }

    render() {
        const { from } = this.props.location || { from: { pathname: '/' } };
        const { redirectTo } = this.state;

        if (redirectTo === true) {
            return <Redirect to={from} />
        } else {
            return (
                <div className="LoginForm">
                    <h1>Login</h1>
                    <form>
                        <div className="form-group">
                            <div className="col-auto">
                                <label className="form-label" htmlFor="username">Username: </label>
                            </div>
                            <div className="col-auto">
                                <input className="form-control"
                                    type="text"
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-auto">
                                <label className="form-label" htmlFor="password">Password: </label>
                            </div>
                            <div className="col-auto">
                                <input className="form-control"
                                    type="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group ">
                            <div className="col-auto">
                                <button className="btn btn-primary col-2 col-mr-auto" onClick={this.handleSubmit}>
                                    Login
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )
        }
    }

}
