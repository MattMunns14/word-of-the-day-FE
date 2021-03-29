import React, {Component} from 'react';
import axios from 'axios';
import './Registration.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";


export default class Registration extends Component {
    constructor(props) {
        super(props);


        this.state = {
            email: "",
            password: "",
            password_confirmation: "",
            registrationErrors: "",
            isLogin: true,
            registration_status: null
        }

        this.handleSubmitRegistration = this.handleSubmitRegistration.bind(this)
        this.handleSubmitLogin = this.handleSubmitLogin.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.changeUse = this.changeUse.bind(this)
    }

    handleChange(event) {
        console.log(event)
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    changeUse(event) {
        this.setState(state => ({
            isLogin: !state.isLogin
        }))
    }

    handleSubmitRegistration(event) {
        var data = {
            action: 'register',
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation

        }
        const headers = {
            'Content-Type': 'application/json',
        }

        axios.post('https://api.wordsoftheday.org/index-operation',
            data,
            headers,
            {withCredentials: true}
        )
            .then(response => {
                console.log('registration res', response);
                if(response.data.status === 200){
                    this.setState(state => ({
                        registration_status: 'success'
                    }));
                }
                else{
                    this.setState(state => ({
                        registration_status: 'failure'
                    }));
                }
            })
            .catch(error => {
                console.log('error', error);
                this.setState(state => ({
                    registration_status: 'failure'
                }));
            })
        ;
        event.preventDefault();


        this.setState(state => ({
            isLogin: !state.isLogin,
            email: '',
            password: ''
            })

        )
        console.log(this.state.registration_status)

    }

    handleSubmitLogin(event) {
        var data = {
            action: 'login',
            email: this.state.email,
            password: this.state.password,

        }

        const headers = {
            'Content-Type': 'application/json',
        }


        axios.post('https://api.wordsoftheday.org/index-operation',
            data,
            headers,
            {withCredentials: true}
        )
            .then(response => {console.log('registration res', response);
            })
            .catch(error => {console.log('error', error);
            })
        ;
        event.preventDefault();
        this.setState( state=> ({
            registration_status: null
        }))

    };

    render() {
        const registrationAlert = () =>
            {

                if (this.state.registration_status === 'success'){
                    return(
                        <Alert variant='sucess'>
                            <Alert.Heading>Registration Successful</Alert.Heading>
                        </Alert>
                    )
                }
                else if (this.state.registration_status === 'failure'){
                    return(
                        <Alert variant='danger'>
                            <Alert.Heading>Registration Failed</Alert.Heading>
                        </Alert>
                    )
                }
            }
        if (this.state.isLogin) {
            return (
                <div className="Login">
                    <h3>Login</h3>

                    <Form onSubmit={this.handleSubmitLogin}>
                        <Form.Group size="lg" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                autoFocus
                                type="email"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Button block size="lg" type="submit">
                            Login
                        </Button>

                        <p className="forgot-password text-right">
                            <button class="btn btn-link" onClick={this.changeUse}>Sign Up</button>
                        </p>
                        {registrationAlert()}
                    </Form>

                </div>
            )
        }
        else {
            return (
                <div className="Registration">
                    <h3>Sign Up</h3>
                    <Form onSubmit={this.handleSubmitRegistration}>
                        <Form.Group size="lg" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                autoFocus
                                type="email"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="password_confirmation">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password_confirmation"
                                value={this.state.password_confirmation}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Button block size="lg" type="submit">
                            Create User
                        </Button>
                    </Form>
                </div>
            )
        }
    }
}

