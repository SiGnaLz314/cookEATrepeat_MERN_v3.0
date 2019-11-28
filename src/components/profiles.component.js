import React, { Component } from 'react';
import axios from 'axios';


export default class Profile extends Component {
    constructor(props) {
        super(props);
        
        this.componentDidMount = this.componentDidMount.bind(this);
        
        this.state = {
            users: [],
        }
    }
    componentDidMount() {
        axios.get('http://localhost:5000/profiles/')
        .then((res) => {
            if (res.data.users) {
                this.setState({
                    users: res.data,
                });
            } else {
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

    userDetail(){
        const uList = this.state.users.map(currentuser => {
            return <tr key={currentuser._id}><td key={currentuser._id}>{currentuser.local.username}</td></tr>;
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