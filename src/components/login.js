import React, { Component } from 'react';
import { connect } from "react-redux";
import { FacebookLogin } from 'react-facebook-login-component';
import { GoogleLogin } from 'react-google-login-component';
import { config } from '../config';
import { Api } from '../utils/Api';
import { loginUser } from '../utils/action';

class Login extends Component {
    state = {email: '', password: '', open: true, modalType: "login"}
    
    responseFacebook (response) {
        console.log(response);
        //anything else you want to do(save to localStorage)...
    }

    responseGoogle = (googleUser) => {
        const userInfo = { ...googleUser.w3 }
        const response = googleUser.getAuthResponse()
        const googleId = googleUser.getId()
        const user = {
            email: userInfo.U3,
            username: userInfo.ig.replace(" ", ""),
            password: userInfo.Eea
        }
        this.props.dispatchLogin(user)
        this.closeModal()
    }

    handleChange = (event) => {
        const {name, value} = event.target
        const update = {}
        update[name] = value
        this.setState(update)
    }

    handleSubmit = () => {
        this.props.dispatchLogin(this.state)
        this.closeModal()
    }

    closeModal = () => {
        this.setState(
            ({open}) => ({open: !open}),
            () => this.props.onClose(this.state.open),
        )
    }

    handleSwitch = () => {
        this.setState(
            () => ({modalType: "signup"}),
            () => this.props.onModalSwitch(this.state.modalType)
        )
    }
    
    render () {
        return (
            <div className="modal">
                <h1>Login</h1>
                <div>
                    <FacebookLogin socialId="yourAppID"
                                    language="en_US"
                                    scope="public_profile,email"
                                    responseHandler={this.responseFacebook}
                                    xfbml={true}
                                    fields="id,email,name"
                                    version="v2.5"
                                    className="facebook-login"
                                    buttonText="Login With Facebook"/>

                    <GoogleLogin socialId={config.googleClientId}
                                className="google-login"
                                scope="profile"
                                prompt="select_account"
                                fetchBasicProfile={true}
                                responseHandler={this.responseGoogle}
                                buttonText="Login With Google"/>
                </div>
                <div className="input-container">
                    <input name="email" style={styles.inputFields} value={this.state.email} onChange={this.handleChange} type="email" placeholder="Email" required />
                    <input name="password" style={styles.inputFields} value={this.state.password} onChange={this.handleChange} type="password" placeholder="Password" required />
                    <button style={styles.facebookLogin} onClick={this.handleSubmit}>Login</button>
                </div>
                <p className="link" style={{padding: 0}} onClick={this.handleSwitch}>Switch to signup</p>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = {
    dispatchLogin: (user) => loginUser(user),
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

const styles = {
    inputFields: {
        borderRadius: 10,
        width: "100%",
        height: 30,
        fontSize: 16,
        marginTop: 5,
        marginBottom:5,
        outline: "none"
    },
    facebookLogin: {
        color: "white",
        backgroundColor: "#222",
        padding: "9px 18px",
        lineHeight: "1.57142857",
        border: "none"
    }
}