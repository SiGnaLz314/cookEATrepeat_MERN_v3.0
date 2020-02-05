// @flow
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from "../components/login";
import SignUp from "../components/signup";
import Navbar from "../components/navbar";
import Home from "../components/home";
import RecipesList from "../components/recipes-list";
import RecipeDetail from "../components/recipe-detail";
import EditRecipe from "../components/edit-recipe";
import CreateRecipe from "../components/create-recipe";
import Profile from "../components/profiles";
import AuthRoute from "../components/auth-route";

type State = {
    admin: boolean,
    loggedIn: boolean,
    user?: string | null, 
    recipes: Array<{
        recipe_id: string,
        recipename?: string,
        ingredients?: string,
        instructions?: string,
        imageURL: string
    }>,
    loading: boolean
}
class AppSwitch extends Component<{}, State> {
    state: State;
    constructor() {
        super();

        this._logout = this._logout.bind(this);
        this.setUser = this.setUser.bind(this);
        this.updateRecipes = this.updateRecipes.bind(this);
        this.updateRecipes();
        
        this.state = {
            admin: false,
            loggedIn: false,
            user: null,
            recipes: [],
            loading: false
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)

        const user = '/api/users/';
        try{
            fetch(user, {method: 'GET', headers: {
                Accept: 'application/json', }, 
            })
            .then(async (res) => {
                const userData = await res.json();
                if (userData.user) {
                    this.setState({
                        loggedIn: true,
                        user: userData.username,
                        admin: userData.user.admin,
                        loading: true,
                    });
                } else {
                    this.setState({
                        loggedIn: false,
                        admin: false,
                        user: null,
                        loading: true,
                    });
                }
            })
        } catch(err) {
            console.log(err);
        }
    }
    

    _logout = (event: SyntheticEvent<>) => {
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
    setUser = (user: {userInfo: {admin: boolean, user: string}}) => {
        this.setState({
            loggedIn: true,
            admin: user.userInfo.admin,
            user: user.userInfo.user
        });
    }
    updateRecipes = () => {
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
        <Switch><>
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
            <Route path="/recipe/:id" component={RecipeDetail} />
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
            <Redirect path="*" to="/" />
        </></Switch >
        );
    }
}
export default AppSwitch;