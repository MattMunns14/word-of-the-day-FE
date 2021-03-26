import React, {Component} from 'react';
import axios from 'axios'

export default class Registration extends Component {
    constructor(props) {
        super(props);


        this.state = {
            email: "",
            password: "",
            password_confirmation: "",
            registrationErrors: "",

        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        axios.post(


            'https://api.wordsoftheday.org/index-operations',

            {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    user: this.state.email,
                    password: this.state.password,
                    password_confirmation: this.state.password_confirmation
                },
            {withCredentials: true}
        )
            .then(response => {console.log('registration res', response);
            })
            .catch(error => {console.log('error', error);
            })
        ;
        event.preventDefault()

    }



    render (){
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password_confirmation"
                        placeholder="Confirm password"
                        value={this.state.password_confirmation}
                        onChange={this.handleChange}
                        required
                    />

                    <button type="submit">Register</button>

                </form>
            </div>
        )
    }
}