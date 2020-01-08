import React, { Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import axios from 'axios';

import "bootstrap/dist/css/bootstrap.min.css";
import "./stylesheets/App.css";
import * as cooking from './stylesheets/cooking.json';

import FadeIn from "react-fade-in";
import Lottie from "react-lottie";

import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import Navbar from "./components/navbar.component";
import Footer from "./components/footer.component";
import Home from "./components/home.component";
import RecipesList from "./components/recipes-list.component";
import RecipeDetail from "./components/recipe-detail.component";
import EditRecipe from "./components/edit-recipe.component";
import CreateRecipe from "./components/create-recipe.component";
import Profile from "./components/profiles.component";

// Animated Background Options
const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: cooking.default,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};

/**
 * AuthRoute: Protect Routes.
 * Unauthorized Users will be Redirected to /login Page.
 * 
 * @param component Protected Component
 * @param [...rest] Additional Props to be passed to the Component
 */
const AuthRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        rest.loggedIn === true
            ? (Component === CreateRecipe
                ? <Component addRecipe={rest.addRecipe} {...props} />
                : <Component {...props} />)
            : <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }} />
    )} />
)

/**
 * App: Atrium of the application.
 * 
 * Handles main data queries and authentication.
 * 
 * @listens event: login()
 * @listens event: logout()
 * 
 * @returns {render()} Routes with necessary props passed.
 */
class App extends Component {
    constructor() {
        super();

        this.componentDidMount = this.componentDidMount.bind(this);
        this._logout = this._logout.bind(this);
        this.setUser = this.setUser.bind(this);
        this.removeRecipe = this.removeRecipe.bind(this);
        this.addRecipe = this.addRecipe.bind(this);

        this.state = {
            loggedIn: false,
            user: null,
            recipes: [],
            loading: undefined
        }
    }

    async componentDidMount() {
        window.scrollTo(0, 0)
        // RECIPES & USER Passed down to components as PROPS of App
        await setTimeout(() => {
            axios.all([
                axios.get('/api/recipes/'),
                axios.get('/api/users/')
            ])
                .then(axios.spread((resRecipe, resUser) => {
                    if (resUser.data.user) {
                        this.setState({
                            loggedIn: true,
                            user: resUser.data.user,
                            recipes: resRecipe.data,
                            loading: true,
                        });
                    } else {
                        console.log(resRecipe.data);
                        this.setState({
                            loggedIn: false,
                            user: null,
                            recipes: resRecipe.data,
                            loading: true,
                        });
                    }
                }))
                .catch(err => {
                    console.log('load error: ')
                    console.log(err);
                })
        }, 2100);
    }

    _logout(event) {
        event.preventDefault();
        axios.post('api/users/logout')
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        loggedIn: false,
                        user: null
                    });
                }
            })
            .catch(err => {
                console.log('logout error: ')
                console.log(err);
            })
    }

    /**
     * setUser: Updates User status.
     * 
     * Sets loggedIn state to boolean, and user to object passed from response login.component.js.
     * 
     */
    setUser(user) {
        this.setState({
            loggedIn: true,
            user: user.userInfo.user
        });
    }
    /**
     * removeRecipe: Removes recipe from state based on recipeID parameter.
     * 
     * Recieved from recipes-list.component.
     * 
     * @see recipes-list.component
     * 
     * @param {String} recipeID id of recipe that was deleted
     */
    removeRecipe(recipeID) {
        this.setState({
            recipes: this.state.recipes.filter(el => el.recipe_id !== recipeID),
        })
    }

    /**
     * addRecipe: Adds recipe to state based on recipe Object parameter.
     * 
     * Recieved from create-recipe.component.
     * 
     * @see create-recipe.component
     * 
     * @param {Object} recipe recipe that was added
     */
    addRecipe(recipe) {
        let rArray = this.state.recipes;
        // Assign temp recipe_id to new recipe. 
        // Will be updated with Actual on next get to /recipes
        recipe.recipe_id = rArray[rArray.length - 1].recipe_id + 1;
        rArray.push(recipe);
        this.setState({
            recipes: rArray,
        })
    }

    render() {
        return (
            <>
                {!this.state.loading ? (
                    <FadeIn>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12 p-0">
                                    <div className="min-vh-100 text-center d-flex flex-column justify-content-center">
                                        <h1>we shall wait for good food</h1>
                                        <Lottie options={defaultOptions} height={120} width={120} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                ) : (
                        <Switch>
                            <>
                                <Navbar _logout={this._logout} loggedIn={this.state.loggedIn} />
                                <br />
                                <Route exact path="/" render={() =>
                                        <Home
                                            user={this.state.user}
                                            recipes={this.state.recipes} />} />
                                <Route exact path="/login" render={() =>
                                    <Login
                                        setUser={this.setUser} />} />
                                <Route exact path="/signup" component={SignUp} />
                                <Route path="/recipes" render={() =>
                                    <RecipesList
                                        recipes={this.state.recipes}
                                        removeRecipe={this.removeRecipe}
                                        loggedIn={this.state.loggedIn} />} />
                                <Route path="/recipe/:id" render={() =>
                                    <RecipeDetail recipes={this.state.recipes} />} />
                                <AuthRoute path="/edit/:id" loggedIn={this.state.loggedIn} recipes={this.state.recipes} component={EditRecipe} />
                                <AuthRoute path="/create"
                                    loggedIn={this.state.loggedIn}
                                    component={CreateRecipe}
                                    addRecipe={this.addRecipe} />
                                <AuthRoute path="/profiles" loggedIn={this.state.loggedIn} component={Profile} />
                            </>
                            <Redirect path="*" to="/" />
                        </Switch >
                    )}
                <Footer />
            </>
        );
    }
}

export default App;
