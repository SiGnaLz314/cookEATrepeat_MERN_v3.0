import React, { Component } from 'react';
import axios from 'axios';

/**
 * Profile: Displays List of registered users
 * 
 * @fires axios.get('/profiles/')
 * 
 * @returns {DOM elements} Registerd User Details
 */
export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.componentDidMount = this.componentDidMount.bind(this);

        this.state = {
            users: [],
        }
    }

    componentDidMount() {
        // Ensure component mounts at top of page.
        window.scrollTo(0, 0);
        let axiosConfig = {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
            }
        }
        axios.get('/api/profiles/', axiosConfig)
            .then((res) => {
                console.log("Profiles res.data:", res.data);
                let userNames = [];
                res.data.map(userObject =>{
                    let i = userObject.username.split('').findIndex(el => el === '@')
                    userNames.push(userObject.username.slice(0, i));
                    return true;
                })
                this.setState({
                    users: userNames,
                });
            })
            .catch(err => {
                console.log('Profiles Load Error: ')
                console.log(err);
            })
    }

    /**
     * userDetail: Map individual users to table row element
     * 
     * @return {Array} Containing <tr> elements with user data.
     */
    userDetail() {
        const uList = this.state.users.map((currentuser, idx) => {
            return <tr key={idx}><td key={idx}>{currentuser}</td></tr>;
        })
        return uList;
    }

    render() {
        return (
            <div>
                <h2>USERS:</h2>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>User:</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.userDetail()}
                    </tbody>
                </table>
            </div>
        )
    }
}