import React, { Component } from 'react';
import 'whatwg-fetch'
import { render } from "react-dom";

/* Import Components */
import CheckBox from '../components/CheckBox';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import Select from '../components/Select';
import Button from '../components/Button';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class FormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newUser: {
        name: '',
        age: '',
        gender: '',
        status: [],
        about: '',
        password: ''
      },

      genderOptions: ['Male', 'Female', 'Others'],
      skillOptions: ['Savings', 'Credit', 'Debit', 'Current']

    }
    this.handleTextArea = this.handleTextArea.bind(this);
    this.handleAge = this.handleAge.bind(this);
    this.handleFullName = this.handleFullName.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);

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

  handleLogIn(e) {
    //render(<App loggedIn= {true} />, document.getElementById("root"));

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

  handleAge(e) {
    let value = e.target.value;
    this.setState(prevState => ({
      newUser:
      {
        ...prevState.newUser, age: value
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

  handleTextArea(e) {
    console.log("Inside handleTextArea");
    let value = e.target.value;
    this.setState(prevState => ({
      newUser: {
        ...prevState.newUser, about: value
      }
    }), () => console.log(this.state.newUser))
  }


  handleCheckBox(e) {

    const newSelection = e.target.value;
    let newSelectionArray;

    if (this.state.newUser.status.indexOf(newSelection) > -1) {
      newSelectionArray = this.state.newUser.status.filter(s => s !== newSelection)
    } else {
      newSelectionArray = [...this.state.newUser.status, newSelection];
    }

    this.setState(prevState => ({
      newUser:
        { ...prevState.newUser, status: newSelectionArray }
    })
    )
  }

  handleFormSubmit(e) {
    e.preventDefault();
    let userData = this.state.newUser;
    console.log("sending user data" + userData);
    fetch('http://localhost:4000/post', {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response => {
      response.json().then(data => {
        console.log("Successful" + data);
      })
    })
  }

  handleClearForm(e) {

    e.preventDefault();
    this.setState({
      newUser: {
        name: '',
        age: '',
        gender: '',
        status: [],
        about: '',
        password: ''
      },
    })
  }

  render() {
    return (
      //onSubmit={this.handleFormSubmit}
      <form className="container-fluid" >

        <Input inputType={'text'}
          title={'Full Name'}
          name={'name'}
          value={this.state.newUser.name}
          placeholder={'Enter your name'}
          handleChange={this.handleInput}

        /> {/* Name of the user */}

        <Input inputType={'number'}
          name={'age'}
          title={'Age'}
          value={this.state.newUser.age}
          placeholder={'Enter your age'}
          handleChange={this.handleAge} /> {/* Age */}

        <Input inputType={'password'}
          title={'Password'}
          name={'Password'}
          value={this.state.newUser.password}
          placeholder={'Enter password'}
          handleChange={this.handlePassword}

        /> {/* Name of the user */}


        <Select title={'Gender'}
          name={'gender'}
          options={this.state.genderOptions}
          value={this.state.newUser.gender}
          placeholder={'Select Gender'}
          handleChange={this.handleInput}
        /> {/* Age Selection */}
        <CheckBox title={'Account Type'}
          name={'status'}
          options={this.state.skillOptions}
          selectedOptions={this.state.newUser.status}
          handleChange={this.handleCheckBox}
        /> {/* Skill */}
        <TextArea
          title={'Other Bank Details'}
          rows={10}
          value={this.state.newUser.about}
          name={'currentPetInfo'}
          handleChange={this.handleTextArea}
          placeholder={'Address proof, etc'} />{/* About you */}

        <Button
          action={this.handleFormSubmit}
          type={'primary'}
          title={'Register'}
          style={buttonStyle}
        /> { /*Submit */}

        <Button
          action={this.handleClearForm}
          type={'secondary'}
          title={'Clear'}
          style={buttonStyle}
        /> {/* Clear the form */}

        <Link to="/login">
          <Button
            action={this.handleLogIn}
            type={'secondary'}
            title={'Login instead?'}
            style={buttonStyle}
          /> { /*Log  User In */}
        </Link>

      </form>

    );
  }
}

const buttonStyle = {
  margin: '10px 10px 10px 10px'
}

export default FormContainer;