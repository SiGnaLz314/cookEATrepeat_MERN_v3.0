import React, { Component } from 'react';
import axios from 'axios';

/**
 * Profile: Displays List of registered users
 * 
 * @fires axios.get('http://localhost:5000/profiles/')
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
        let axiosConfig = {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': 'http://localhost:3000/',
              'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
            }
        }
        axios.get('http://localhost:5000/profiles/', axiosConfig)
        .then((res) => {
            if (res.data.users) {
                // console.log("Profiles res.data:", res.data);

                this.setState({
                    users: res.data,
                });
            } else {
                // console.log("Profiles else res.data:", res.data);
                this.setState({
                    users: res.data,
                });
            }
        })
        .catch(error => {
            console.log('load error: ')
            console.log(error);
        })
    }

    /**
     * userDetail: Map individual users to table row element
     * 
     * @return {Array} Containing <tr> elements with user data.
     */
    userDetail(){
        const uList = this.state.users.map(currentuser => {
            return <tr key={currentuser._id}><td key={currentuser._id}>{currentuser.username}</td></tr>;
        }) 
        return uList;
    }

    render() {
        return(
            <div>
                <h2>USERS:</h2>
                    <table className="table">
                        <thead className="thead-light">
                            <tr>
                                <th>User:</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.userDetail()}
                        </tbody>
                    </table>
            </div>
        )
    }
}