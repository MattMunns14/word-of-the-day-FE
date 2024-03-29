import './App.css';
import React,  { Component } from 'react';
import Dashboard from "../Dashboard/Dashboard";
import Registration from "../Registration/Registration";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Cookies from 'universal-cookie';
import axios from 'axios';

export default class App extends Component {
    constructor() {
        super();

        this.state = {
            loggedIn: false,
            loginScreen: 'login'
        };
        this.handleLogin = this.handleLogin.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
    };

    

    checkLoginStatus() {
        const login_cookie = new Cookies()
        console.log('checking login')
        if (login_cookie.get('auth_token')) {
            let token = login_cookie.get('auth_token')
            var data = {
                action: 'verify_token',
                token_to_verify: token
                
            }
            const headers = {
                'Content-Type': 'application/json',
            }
            axios.post(
                'https://api.wordsoftheday.org/index-operation',
                data, 
                headers, 
                {withCredentials:true}
            ).then(this.setState({
                loggedIn:true
            }))
            }
    };

    handleLogout() {
        this.setState({
            loggedIn:false,
        });
    }

    handleLogin(data) {
        this.setState({
            loggedInStatus: true,
        });
    }

    componentDidMount() {
        this.checkLoginStatus();
    };


    render() {
        if (this.state.loggedIn) {
            return (
                <Dashboard/>
            )
        }
        else {
            return (
                <div className="App">
                    <Container>
                        <Navbar expand="lg" variant="light" bg="light">
                            <Navbar.Brand >Words of the Day!</Navbar.Brand>
                        </Navbar>
                    </Container>
                    <Registration/>
                </div>
            );

        }

    }
}

