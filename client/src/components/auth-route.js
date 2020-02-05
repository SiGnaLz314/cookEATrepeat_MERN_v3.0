// @flow
import { Route, Redirect } from "react-router-dom";
import React from 'react';

type Rest = {
    component: string,
    loggedIn: boolean,
    updateRecipes?: () => void,
    admin?: boolean,
    recipes?: Array<{
        recipe_id: string,
        recipename?: string,
        ingredients?: string,
        instructions?: string,
        imageURL: string
    }>,
};

const AuthRoute = ({ component: Component, ...rest }: Rest) => {
    return (
        <Route {...rest} render={(props) => (
            rest.loggedIn === true ? (
                rest.updateRecipes ? (
                    <Component updateRecipes={rest.updateRecipes} {...props} />
                ) : (
                    <Component {...props} />
                )
            ) : (
                    <Redirect to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }} />
                )
        )} />
    );
};
export default AuthRoute;