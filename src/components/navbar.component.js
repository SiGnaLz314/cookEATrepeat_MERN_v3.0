import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

/**
 * UserLinks: Displays DOM elements in NavBar based on loggedIn
 * 
 * @param {*} props loggedIn (boolean) _logout (App method)
 * 
 * @returns {DOM elements} Login and Signup, or Logout
 */
const UserLinks = props => {
	if (props.loggedIn) {
		return (
            <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                    <NavLink to="#" className="nav-link" onClick={props._logout}>
                        logout
                    </NavLink>
                </li>
            </ul>
		)
	} else {
		return (
            <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                    <NavLink to="/login" className="nav-link">
                        login
                    </NavLink>
                </li>
                <li className="navbar-item">
                    <NavLink to="/signup" className="nav-link">
                        sign up
                    </NavLink>
                </li>
            </ul>
		)
	}
}



export default class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = {}
}

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-link">
                        <NavLink exact to="/" className="nav-link">cookEATrepeat</NavLink>
                    </li>
                    <li className="nav-link">
                        <NavLink to="/recipes" className="nav-link">recipes</NavLink>
                    </li>
                    
                    <li className="nav-link">
                        <NavLink to="/profiles" className="nav-link">profiles</NavLink>
                    </li>
                    {this.props.loggedIn ? (
                        <>
                            <li className="nav-link">
                                <NavLink to="/create" className="nav-link">create recipe</NavLink>
                            </li>
                        </>
                    ) : (
                        <></>
                    )}
                </ul>
                <ul className="navbar-nav ml-auto">
                <li className="nav-link">
                    <UserLinks _logout={this.props._logout} loggedIn={this.props.loggedIn} />
                </li>
                </ul>
                </div>
            </nav>
        );
    }
}
