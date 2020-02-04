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
    return (props.loggedIn ? (
        <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
                <NavLink to="/logout" className="nav-link" onClick={props._logout}>
                    logout
                </NavLink>
            </li>
        </ul>
        ) : (
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
    )
}

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: false
        };
        this.toggleNavBar = this.toggleNavBar.bind(this);
    }

    toggleNavBar() {
        this.setState({ menu: !this.state.menu })
    }

    render() {
        const show = (this.state.menu ? "show" : "");

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="/">cookEATrepeat</a>
                <button className="navbar-toggler" type="button" onClick={this.toggleNavBar}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={"collapse navbar-collapse " + show}>
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <NavLink exact to="/" className="nav-link">home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/recipes" className="nav-link">recipes</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/create" className="nav-link">create recipe</NavLink>
                        </li>
                        {this.props.loggedIn ? (
                            <>
                                <li className="nav-item">
                                    <NavLink to="/profiles" className="nav-link">profiles</NavLink>
                                </li>
                            </>
                        ) : (
                                <></>
                            )}
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <UserLinks className="nav-link" _logout={this.props._logout} loggedIn={this.props.loggedIn} />
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
