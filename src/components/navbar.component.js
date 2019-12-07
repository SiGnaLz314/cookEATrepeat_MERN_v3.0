import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
                    <Link to="#" className="nav-link" onClick={props._logout}>
                        logout
                    </Link>
                </li>
            </ul>
		)
	} else {
		return (
            <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                    <Link to="/login" className="nav-link">
                        login
                    </Link>
                </li>
                <li className="navbar-item">
                    <Link to="/signup" className="nav-link">
                        sign up
                    </Link>
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
            <Link to="/" className="navbar-brand">cookEATrepeat</Link>
                <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-link">
                        <Link to="/recipes" className="nav-link">recipes</Link>
                    </li>
                    
                    <li className="nav-link">
                        <Link to="/profiles" className="nav-link">profiles</Link>
                    </li>
                    {this.props.loggedIn ? (
                        <>
                            <li className="nav-link">
                                <Link to="/create" className="nav-link">create recipe</Link>
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
