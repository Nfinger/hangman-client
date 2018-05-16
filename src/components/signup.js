import React, { Component } from 'react';
import { FacebookLogin } from 'react-facebook-login-component';
import { GoogleLogin } from 'react-google-login-component';
import { connect } from 'react-redux'

import { config } from '../config';
import {
    LOG_IN,
    SIGN_UP,
    LOG_OUT
} from '../reducers/auth'

import { createUser } from "../utils/action";

import { Api } from '../utils/Api';

class Signup extends Component {
    state = {email: '', password: '', secondPassword: '', username: '', error: '', modalType: '', disabled: true, open: true}
    
    responseFacebook (response) {
        console.log(response);
        this.props.dispatchCreateUser()
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
        this.props.dispatchCreateUser(user)
        this.setState(
            ({open}) => {open: !open},
            () => this.props.onClose(this.state.open)
        )
    }

    handleChange = (event) => {
        const {name, value} = event.target
        const update = {disabled: true}
        update[name] = value
        this.setState(update)
    }

    handleSubmit = () => {
        this.props.dispatchCreateUser(this.state)
        this.closeModal()
    }

    handleSwitch = () => {
        this.setState(
            () => ({modalType: "login"}),
            () => this.props.onModalSwitch()
        )
    }

    closeModal = () => {
        this.setState(
            ({open}) => ({open: !open}),
            () => this.props.onClose(this.state.open),
        )
    }

    // componentWillReceiveProps()
    
    render () {
        const { err } = this.props
        return (
            <div className="modal">
                <h1>Signup</h1>
                {err && <i className="error-text">{err}</i>}
                <div>
                    <FacebookLogin socialId="589920334721501"
                                    language="en_US"
                                    scope="public_profile,email"
                                    responseHandler={this.responseFacebook}
                                    xfbml={true}
                                    fields="id,email,name"
                                    version="v2.5"
                                    className="facebook-login"
                                    buttonText="Sign up With Facebook"/>

                    <GoogleLogin socialId={config.googleClientId}
                                className="google-login"
                                scope="profile"
                                prompt="select_account"
                                fetchBasicProfile={true}
                                responseHandler={this.responseGoogle}
                                buttonText="Sign up With Google"/>
                </div>
                <div className="input-container">
                    {this.state.error && <p>{this.state.error}</p>}
                    <input name="username" style={styles.inputFields} value={this.state.username} onChange={this.handleChange} type="text" placeholder="Username" required />
                    <input name="email" style={styles.inputFields} value={this.state.email} onChange={this.handleChange} type="email" placeholder="Email" required />
                    <input name="password" style={styles.inputFields} value={this.state.password} onChange={this.handleChange} type="password" placeholder="Password" required />
                    <input name="secondPassword" style={styles.inputFields} value={this.state.secondPassword} onChange={this.handleChange} type="password" placeholder="Re-Enter Password" required />
                    <button style={styles.facebookLogin} onClick={this.handleSubmit}>Signup</button>
                </div>
                <p className="link" style={{padding: 0}} onClick={this.handleSwitch}>Switch to login</p>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    err: state.err
})

const mapDispatchToProps = {
    dispatchCreateUser: (user) => createUser(user),
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)

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