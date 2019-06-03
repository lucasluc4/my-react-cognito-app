import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

class SignUpForm extends Component {
    state = {
        signedUp: false,
        confirmed: false,
        username: '',
        password: '',
        email: '',
        phoneNumber: '',
        confirmationCode: '',
        submittingSignUp: false,
        submittingConfirmation: false
    }

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitSignUp = this.handleSubmitSignUp.bind(this);
        this.handleSubmitConfirmationSignUp = this.handleSubmitConfirmationSignUp.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmitSignUp(e) {
        e.preventDefault(e);
        const { confirmed, signedUp, username, password, email, phoneNumber } = this.state;
        
        if(!confirmed && !signedUp) {
            this.setState({ submittingSignUp: true });

            Auth.signUp({
                username,
                password,
                attributes: {
                    email,
                    phone_number: phoneNumber
                }
            })
            .then(() => this.setState({ signedUp: true, submittingSignUp: false }))
            .catch(err => {
                this.setState({ submittingSignUp: false });
                console.log(err);
            });
        }
    }

    handleSubmitConfirmationSignUp(e) {
        e.preventDefault(e);
        const { confirmed, signedUp, username, confirmationCode } = this.state;

        if (!confirmed && signedUp) {
            this.setState({ submittingConfirmation: true });

            Auth
            .confirmSignUp(username, confirmationCode)
            .then(() => this.setState({ submittingConfirmation: false, confirmed: true }))
            .catch((err) => {
                console.log(err);
                this.setState({ submittingConfirmation: false });
            });
            
        }
    }

    render () {
        if (this.state.confirmed) {
            return <div></div>
        }

        if (this.state.signedUp) {
            return (
                <form onSubmit={this.handleSubmitConfirmationSignUp}>
                    <div className="form-group">
                        <label htmlFor="usernameConfirmationInput">Username</label>
                        <input className="form-control" type="text" name="username" id="usernameConfirmationInput" onChange={ this.handleChange } />
                    </div>
                    <div className="form-group">
                        <label htmlFor="codeConfirmationInput">Código de confirmação</label>
                        <input className="form-control" type="text" name="confirmationCode" id="codeConfirmationInput" onChange={ this.handleChange } />
                    </div>
                    <button disabled={this.state.submittingConfirmation} type="submit" className="btn btn-primary">Confirmar</button>
                </form>
            )
        }

        return (
            <form onSubmit={this.handleSubmitSignUp}>
                <div className="form-group">
                    <label htmlFor="usernameSignUpInput">Username</label>
                    <input className="form-control" type="text" name="username" id="usernameSignUpInput" onChange={ this.handleChange } />
                </div>
                <div className="form-group">
                    <label htmlFor="emailSignUpInput">E-mail</label>
                    <input className="form-control" type="email" name="email" id="emailSignUpInput" onChange={ this.handleChange } />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneSignUpInput">Número de telefone</label>
                    <input className="form-control" type="text" name="phoneNumber" id="phoneSignUpInput" onChange={ this.handleChange } />
                </div>
                <div className="form-group">
                    <label htmlFor="passwordSignUpInput">Senha</label>
                    <input className="form-control" type="password" name="password" id="passwordSignUpInput" onChange={ this.handleChange } />
                </div>
                <button disabled={this.state.submittingSignUp} type="submit" className="btn btn-primary">Cadastrar</button>
            </form>
        )
    }
}

export default SignUpForm;