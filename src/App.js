import React, { Component } from 'react';
import './App.css';
import Amplify from 'aws-amplify';
import amplify_config from './amplify-config';

import SignUpForm from './CognitoReactSignUpForm'
import SignInForm from './CognitoReactSignInForm';

Amplify.configure(amplify_config);

class App extends Component {
  state = {
    signUpIsActive: false
  };

  constructor(props) {
    super(props);

    this.toggleActivePage = this.toggleActivePage.bind(this);
  }

  toggleActivePage() {
    this.setState({ signUpIsActive: !this.state.signUpIsActive });
  }

  render() {
    return (
      <div className="App">
        <h1>My React Cognito App</h1>
        <button className="btn btn-light btn-toggle" onClick={this.toggleActivePage}>
          { this.state.signUpIsActive ? "Ir para login" : "Ir para registro" }
        </button>
        { this.state.signUpIsActive ? <SignUpForm /> : <SignInForm /> }
      </div>
    );
  }
  
}

export default App;
