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
                <h4>Stats</h4>
                <div className="divider"></div>
                <div className="stat-container">
                    <h4 className="stat">Wins: {user.stats.wins}</h4>
                    <h4 className="stat">Losses: {user.stats.losses}</h4>
                    <h4 className="stat">Guess Accuracy: {user.stats.accuracy.toFixed(2)}%</h4>
                </div>
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