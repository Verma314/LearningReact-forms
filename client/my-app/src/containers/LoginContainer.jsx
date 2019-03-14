import React, { Component } from 'react';
import 'whatwg-fetch'

/* Import Components */
import Input from '../components/Input';
import Button from '../components/Button';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class LoggedIn extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-md-6">
                <h3> Successful log in! </h3>
                <br></br>
            </div>
        );

    }
}
class NotLoggedIn extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-md-6">
                <h3> Invalid Credentials </h3>
                <br></br>
            </div>
        );

    }
}


class LoginContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newUser: {
                name: '',
                password: ''

            }, isLoggedIn: false


        }
        this.handleFullName = this.handleFullName.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handlePassword = this.handlePassword.bind(this);

    }

    /* This lifecycle hook gets executed when the component mounts */

    handleFullName(e) {
        let value = e.target.value;
        this.setState(prevState => ({
            newUser:
            {
                ...prevState.newUser, name: value
            }
        }), () => console.log(this.state.newUser))
    }

    handlePassword(e) {
        let value = e.target.value;
        this.setState(prevState => ({
            newUser:
            {
                ...prevState.newUser, password: value
            }
        }), () => console.log(this.state.newUser))
    }


    handleInput(e) {
        let value = e.target.value;
        let name = e.target.name;
        this.setState(prevState => ({
            newUser:
            {
                ...prevState.newUser, [name]: value
            }
        }), () => console.log(this.state.newUser))
    }




    handleFormSubmit(e) {
        e.preventDefault();
        let userData = this.state.newUser;
        console.log("sending user data" + userData);

        fetch('http://localhost:4000/login', {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(response => {
            console.log(response);
            response.json().then(data => {
                console.log("Successful" + data);
                if ( data.status == false) {
                    //do nothing
                    console.log('invalid info');
                    this.setState(prevState => ({
                        newUser:
                        {
                            ...prevState.newUser
                        }, isLoggedIn: false
                    }), () => console.log('hi', this.state.newUser))
                }
                if (data.status) {
                    this.setState(prevState => ({
                        newUser:
                        {
                            ...prevState.newUser
                        }, isLoggedIn: true
                    }), () => console.log('hi', this.state.newUser))
                }
            })
        })
    }

    handleClearForm(e) {

        e.preventDefault();
        this.setState({
            newUser: {
                name: '',
                password: ''
            },
        })
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        return (

            <form className="container-fluid" onSubmit={this.handleFormSubmit}>


                <Input inputType={'text'}
                    title={'Full Name'}
                    name={'name'}
                    value={this.state.newUser.name}
                    placeholder={'Enter your name'}
                    handleChange={this.handleInput}

                /> {/* Name of the user */}


                <Input inputType={'password'}
                    title={'Password'}
                    name={'Password'}
                    value={this.state.newUser.password}
                    placeholder={'Enter password'}
                    handleChange={this.handlePassword}

                /> {/* Name of the user */}

                <Button
                    action={this.handleFormSubmit}
                    type={'primary'}
                    title={'Login'}
                    style={buttonStyle}
                /> { /*Submit */}
                
                <Link to="/">
                <Button
                    action={this.handleClearForm}
                    type={'secondary'}
                    title={'Cancel'}
                    style={buttonStyle}
                /> {/* Clear the form */}
                </Link>


                <div>
                    {isLoggedIn ? (
                        <LoggedIn />
                    ) : (
                        <br />
                        )}
                </div>

            </form>

        );
    }
}

const buttonStyle = {
    margin: '10px 10px 10px 10px'
}

export default LoginContainer;