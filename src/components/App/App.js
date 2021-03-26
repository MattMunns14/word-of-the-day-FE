import './App.css';
import React,  { useState } from 'react';
import Dashboard from "../Dashboard/Dashboard";
import Login from "../Login/Login";
import Registration from "../Registration/Registration";


function App() {

    const [token, setToken] = useState()

    if (token) {
        return (
            <Dashboard/>
        )
    }

    return (
        <div className="App">
        Welcome to words of the day!
        <h1>Login</h1>
            {/*<Login setToken={setToken}/>*/}
            <Registration/>

        </div>
    );
}

export default App;
