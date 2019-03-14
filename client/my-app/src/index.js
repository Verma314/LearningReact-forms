import React, { Component } from "react";
import { render } from "react-dom";
import FormContainer from "./containers/FormContainer";
import LoginContainer from "./containers/LoginContainer";
import {Router, Route, Link} from 'react-router';
import { BrowserRouter } from "react-router-dom";

const styles = {
    fontFamily: "sans-serif",
    textAlign: "center"
};

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-md-6">
                <h3> User Registeration </h3>
                <br></br>
                <FormContainer />
            </div>
        );

    }
}

class LoginApp extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-md-6">
                <h3> User Login </h3>
                <br></br>
                <LoginContainer />
            </div>
        );

    }
}



render((
    <BrowserRouter>
        <div>
        <Route path = "/" component = {App}/>
        <Route path = "/login" component = {LoginApp} />
        </div>
    </BrowserRouter>
 ), document.getElementById('root'));



export default App;
