import React, { Component } from 'react';
import Auth from './Auth/Auth.js';
import { Button } from 'reactstrap';
console.log(process.env.NODE_ENV)
const auth = new Auth();
class Login extends Component {
    login = () => {
        auth.login();
    }
    
    render() {
        return (
            <div>
            <h1>Savings Tracker</h1>
            <section className="Login">
                <Button color="primary" onClick={this.login} className="loginbutton">Login</Button>
            </section>
            </div>
        );
    }
}

export default Login