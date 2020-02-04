import { Route, Redirect } from "react-router-dom";
import React from 'react';

const AuthRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        rest.loggedIn === true
            ? (rest.updateRecipes
                ? <Component updateRecipes={rest.updateRecipes} {...props} />
                : <Component {...props} />)
            : <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }} />
    )} />
);
export default AuthRoute;