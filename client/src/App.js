// @flow
import React, { Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./stylesheets/App.css";
import * as cooking from './stylesheets/cooking.json';

import FadeIn from "react-fade-in";
import Lottie from "react-lottie";

import Login from "./components/login";
import SignUp from "./components/signup";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./components/home";
import RecipesList from "./components/recipes-list";
import RecipeDetail from "./components/recipe-detail";
import EditRecipe from "./components/edit-recipe";
import CreateRecipe from "./components/create-recipe";
import Profile from "./components/profiles";

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
 * @param component Authentication Protected Component
 * @param [...rest] Props pertinent to the Component
 */
const AuthRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        rest.loggedIn === true
            ? (Component === CreateRecipe
                ? <Component updateRecipes={rest.updateRecipes} {...props} />
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
class App extends Component<{}> {
    constructor() {
        super();

        this.componentDidMount = this.componentDidMount.bind(this);
        this._logout = this._logout.bind(this);
        this.setUser = this.setUser.bind(this);
        this.updateRecipes = this.updateRecipes.bind(this);

        this.state = {
            admin: false,
            loggedIn: false,
            user: null,
            recipes: [],
            loading: undefined
        }
    }

    async componentDidMount() {
        window.scrollTo(0, 0)

        await setTimeout(() => {
            const recipe = '/api/recipes/';
            const user = '/api/users/';
            try{
                Promise.all([
                    fetch(recipe, {method: 'GET', headers: {
                        Accept: 'application/json', },
                    }),
                    fetch(user, {method: 'GET', headers: {
                        Accept: 'application/json', },
                    }),
                ])
                .then(async (res) => {
                    const recipes = await res[0].json();
                    const users = await res[1].json();
                    
                    if (users.user) {
                        this.setState({
                            loggedIn: true,
                            user: users,
                            admin: users.user.admin,
                            recipes: recipes,
                            loading: true,
                        });
                    } else {
                        this.setState({
                            loggedIn: false,
                            admin: false,
                            user: null,
                            recipes: recipes,
                            loading: true,
                        });
                    }
                })
            } catch(err) {
                console.log(err);
            }
        }, 2100);
    }

    _logout(event) {
        event.preventDefault();
        
        fetch('/api/users/logout', {method: 'POST',})
            .then(res => {
                if(res.status === 200) {
                    this.setState({
                        loggedIn: false,
                        admin: false,
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
            admin: user.userInfo.admin,
            user: user.userInfo.user
        });
    }

    /**
     * updateRecipes: Makes an update call to recipes database.collection.
     * 
     * Recieved from create-recipe.component.
     * 
     * @see create-recipe.component
     * 
     * @param {Object} recipe recipe that was added
     */
    updateRecipes() {
        const recipe = '/api/recipes/';
        fetch(recipe, {method: 'GET', headers: {
            Accept: 'application/json', },
        })
        .then(async (res) => {
            const recipes = await res.json();
            this.setState({
                recipes: recipes,
            });
        })
        .catch(err => {
            console.log(err);
        });
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
                                            recipes={this.state.recipes} 
                                            admin={this.state.admin} />} 
                                />
                                <Route exact path="/login" render={(props) =>
                                    <Login
                                        setUser={this.setUser} />} 
                                />
                                {/* For ReDirect after logging in after unauthRoute

                                    <Login
                                        setUser={this.setUser}
                                        loggedIn={this.state.loggedIn}
                                        from={props.location.state.from} />} 
                                /> */}
                                <Route exact path="/signup" component={SignUp} />
                                <Route path="/recipes" render={() =>
                                    <RecipesList
                                        recipes={this.state.recipes}
                                        updateRecipes={this.updateRecipes}
                                        loggedIn={this.state.loggedIn}
                                        admin={this.state.admin} />} 
                                />
                                <Route path="/recipe/:id" render={() =>
                                    <RecipeDetail 
                                        recipes={this.state.recipes} 
                                        admin={this.state.admin} />} 
                                />
                                <AuthRoute path="/edit/:id" 
                                    loggedIn={this.state.loggedIn} 
                                    recipes={this.state.recipes} 
                                    admin={this.state.admin}
                                    component={EditRecipe} 
                                />
                                <AuthRoute path="/create"
                                    loggedIn={this.state.loggedIn}
                                    updateRecipes={this.updateRecipes} 
                                    admin={this.state.admin} 
                                    component={CreateRecipe} 
                                />
                                <AuthRoute path="/profiles" 
                                    loggedIn={this.state.loggedIn} 
                                    admin={this.state.admin} 
                                    component={Profile} 
                                />
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
