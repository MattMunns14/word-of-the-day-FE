import './App.css';
import React,  { Component } from 'react';
import Dashboard from "../Dashboard/Dashboard";
import Registration from "../Registration/Registration";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";


export default class App extends Component {
    constructor() {
        super();

        this.state = {
            loggedIn: false,
            user: '',
            loginScreen: 'login'
        };
        this.handleLogin = this.handleLogin.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
    };

    checkLoginStatus() {
        console.log('Checked login status');
    };

    handleLogout() {
        this.setState({
            loggedIn:false,
            user: ''
        });
    }

    handleLogin(data) {
        this.setState({
            loggedInStatus: true,
            user: ''
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

