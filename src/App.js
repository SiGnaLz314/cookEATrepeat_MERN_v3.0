import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from 'axios';

import "bootstrap/dist/css/bootstrap.min.css";
import "./stylesheets/App.css";

import Login from './components/login.component';
import SignUp from './components/signup.component';
import Navbar from "./components/navbar.component";
import Home from "./components/home.component";
import RecipesList from "./components/recipes-list.component";
import RecipeDetail from "./components/recipe.component";
import EditRecipe from "./components/edit-recipe.component";
import CreateRecipe from "./components/create-recipe.component";

class App extends Component {
    constructor() {
        super();

        this.componentDidMount = this.componentDidMount.bind(this);
        this._logout = this._logout.bind(this);
        this._login = this._login.bind(this);

        this.state = {
            loggedIn: false,
            user: null
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/')
            .then(response => {
                console.log(response.data);
                if (response.data.user) {
                    console.log("User Found");
                    this.setState({
                        loggedIn: true,
                        user: response.data.user
                    });
                } else {
                    console.log("No User Found");
                    this.setState({
                        loggedIn: false,
                        user: null
                    });
                }
            })
    }

    _logout(event) {
        event.preventDefault();
        console.log('Logging Out...');
        axios.post('http://localhost:5000/users/logout').then(res => {
            console.log(res.data);
            if (res.status === 200) {
                this.setState({
                    loggedIn: false,
                    user: null
                });
            }
        }).catch(error => {
            console.log('login error: ')
            console.log(error);
        })
    }

    _login(username, password) {
        axios.post('http://localhost:5000/users/login', { username, password })
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    this.setState({
                        loggedIn: true,
                        user: res.data.user
                    });
                }
            })
    }
    render() {
        return (
            <Router>
                <div className="container">
                    <Navbar _logout={this._logout} loggedIn={this.state.loggedIn} />
                    <br />
                    <Route exact path="/"
                        render={() =>
                            <Home user={this.state.user} />}
                    />
                    <Route exact path="/login"
                        render={() =>
                            <Login
                                _login={this._login}
                                _googleSignin={this._googleSignin}
                            />}
                    />
                    <Route exact path="/signup" component={SignUp} />
                    <Route path="/recipes" component={RecipesList} />
                    <Route path="/recipe/:id" component={RecipeDetail} />
                    <Route path="/edit/:id" component={EditRecipe} />
                    <Route path="/create" component={CreateRecipe} />
                </div>
            </Router >
        );
    }
}

export default App;
