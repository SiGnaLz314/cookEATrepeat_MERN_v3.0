import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
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
import Profile from "./components/profiles.component";

const AuthRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      rest.loggedIn === true
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/login',
            state: { from: props.location}
        }} />
    )} />
)

class App extends Component {
    constructor() {
        super();

        this.componentDidMount = this.componentDidMount.bind(this);
        this._logout = this._logout.bind(this);
        this._login = this._login.bind(this);

        this.state = {
            loggedIn: false,
            user: null,
            recipes: [],
        }
    }



    componentDidMount() {
        // RECIPES & USER As PROPS of App
        axios.all([
            axios.get('http://localhost:5000/recipes/'),
            axios.get('http://localhost:5000/users/')
        ])
        .then(axios.spread((resRecipe, resUser) => {
            if (resUser.data.user) {
                this.setState({
                    loggedIn: true,
                    user: resUser.data.user,
                    recipes: resRecipe.data,
                });
            } else {
                this.setState({
                    loggedIn: false,
                    user: null,
                    recipes: resRecipe.data,
                });
            }
        }))
        .catch(error => {
            console.log('load error: ')
            console.log(error);
        })
    }
    


    _logout(event) {
        event.preventDefault();
        console.log('Logging Out...');
        axios.post('http://localhost:5000/users/logout')
            .then(res => {
                console.log(res.data);
                if (res.status === 200) {
                    this.setState({
                        loggedIn: false,
                        user: null
                    });
                    window.location = '/';
            }})
            .catch(error => {
                console.log('logout error: ')
                console.log(error);
            })
    }

    _login(username, password) {
        axios.post('http://localhost:5000/users/login', { username, password })
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        loggedIn: true,
                        user: res.data.user
                    });
                }
            })
            .catch(error => {
                console.log('login error: ')
                console.log(error);
            })
    }
    render() {
        return (
            <Router>
                <div className="container">
                    <Navbar _logout={this._logout} loggedIn={this.state.loggedIn} />
                    <br />
                    <Route exact path="/" render={() =>
                        <Home 
                            user={this.state.user}
                            recipes={this.state.recipes}
                        /> }
                    />
                    <Route exact path="/login" render={() =>
                        <Login
                            _login={this._login}
                            _googleSignin={this._googleSignin}
                        />}
                    />
                    <Route exact path="/signup" component={SignUp} />
                    <Route path="/recipes" render={() =>
                        <RecipesList recipes={this.state.recipes} /> }
                    />
                    <Route path="/recipe/:id" render={() =>
                        <RecipeDetail recipes={this.state.recipes} /> }
                    />
                    <Route path="/edit/:id" render={() => 
                        <EditRecipe recipes={this.state.recipes} /> }
                    />
                    <Route path="/create" component={CreateRecipe} />
                    <AuthRoute path="/profiles" loggedIn={this.state.loggedIn} component={Profile} />
                </div>
            </Router >
        );
    }
}

export default App;
