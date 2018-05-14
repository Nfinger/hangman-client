import React, { Component } from 'react';
import { connect } from "react-redux";

class Profile extends Component {
    state = {value: ''}

    render() {
        const { user } = this.props.auth
        if (!user) return null
        return (
            <div className="App-header">
                <h1>Profile</h1>
                <h3>{user.email}</h3>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
  })
  
  const mapDispatchToProps = {
    // dispatchAuthenticate: (userId) => authenticate(userId)
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Profile)