import React, {Component} from 'react';
import axios from 'axios';
import './Registration.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


export default class Registration extends Component {
    constructor(props) {
        super(props);


        this.state = {
            email: "",
            password: "",
            password_confirmation: "",
            registrationErrors: "",
            isLogin: true,
            registration_success_message: ''

        }

        this.handleSubmitRegistration = this.handleSubmitRegistration.bind(this)
        this.handleSubmitLogin = this.handleSubmitLogin.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.changeUse = this.changeUse.bind(this)
    }

    handleChange(event) {
        console.log('got event')
        console.log(event)
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    changeUse(event) {
        console.log('Changing use')
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
            .then(response => {console.log('registration res', response);
            })
            .catch(error => {console.log('error', error);
            })
        ;
        event.preventDefault();
        this.setState(state => ({
            isLogin: !state.isLogin,
            email: '',
            password: '',
            registration_success_message: String.format('Successfully registered user with email {0}', this.state.email)
            })

        )

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

        console.log('Logged in with data', data);

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
        event.preventDefault()

    };

    render() {
        if (this.state.isLogin) {
            return (
                <div className="Login">
                    {this.state.registration_success_message}
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
                        <Button block size = "lg" onClick={this.changeUse}> Register </Button>

                    </Form>
                </div>
            )
        }
        else {
            return (
                <div className="Registration">
                    {this.state.registration_success_message}
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

    // render() {
    //     return (
    //         <div>
    //
    //             <div/>
    //             )
    //
    //         }
    // //
    // //     if (this.state.isLogin) {
    //         return (
    //
    //             <div>
    //                 <form onSubmit={this.handleSubmitLogin}>
    //                     <input
    //                         type="email"
    //                         name="email"
    //                         placeholder="Email"
    //                         value={this.state.email}
    //                         onChange={this.handleChange}
    //                         required
    //                     />
    //                     <input
    //                         type="password"
    //                         name="password"
    //                         placeholder="Password"
    //                         value={this.state.password}
    //                         onChange={this.handleChange}
    //                         required
    //                     />
    //
    //                     <button type="submit">Login</button>
    //                 </form>
    //                 <button onClick={this.changeUse}> Register </button>
    //             </div>
    //         )
    //     }
    //     else {
    //         return (
    //             <div>
    //                 <form onSubmit={this.handleSubmitRegistration}>
    //                     <input
    //                         type="email"
    //                         name="email"
    //                         placeholder="Email"
    //                         value={this.state.email}
    //                         onChange={this.handleChange}
    //                         required
    //                     />
    //                     <input
    //                         type="password"
    //                         name="password"
    //                         placeholder="Password"
    //                         value={this.state.password}
    //                         onChange={this.handleChange}
    //                         required
    //                     />
    //                     <input
    //                         type="password"
    //                         name="password_confirmation"
    //                         placeholder="Confirm password"
    //                         value={this.state.password_confirmation}
    //                         onChange={this.handleChange}
    //                         required
    //                     />
    //
    //                     <button type="submit">Register</button>
    //                 </form>
    //             </div>
    //         )
    //     }
    // }
