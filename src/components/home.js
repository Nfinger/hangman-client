import React, { Component } from 'react';
import { connect } from "react-redux";
import '../App.css';

import { Hangman } from './hangman';
import { Signup } from './signup';
import { Api } from '../utils/Api';
import { fonts } from '../theme';

class Home extends Component {
    state = {mistakes: 0, guesses: [], answer: '', value: '', error: '', user: null}

    onChange = ({target: {value}} = {}) => {
        if (this.timeout) clearTimeout(this.timeout)
        let error = ""
        if (value.length > 1) {
            value = value[0]
            error = "You can only guess one letter at a time"
            this.timeout = setTimeout(() => {this.setState({error: ""})}, 2000)
        }
        this.setState({value, error})
        }

    handleEnter = ({key}) => {
        const {guesses, value, answer} = this.state
        if (key === "Enter" && value.length > 0 && guesses.indexOf(value.toLowerCase()) === -1) {
            guesses.push(value.toLowerCase())
            this.setState({guesses})
            if (!answer.includes(value.toLowerCase())) {
            const mistakes = this.state.mistakes + 1
            this.setState({mistakes})
            }
            this.setState({value: ""})
        } else if (guesses.indexOf(value.toLowerCase()) > -1) {
            this.setState({error: "You have already guessed that letter. Try another one!"})
            this.timeout = setTimeout(() => {this.setState({error: ""})}, 2000)
        }
    }

    selectDifficulty = async (difficulty) => {
        const { auth: { user } } = this.props
        const res = await Api.newGame(user.id, difficulty)
        const { answer } = JSON.parse(res.data)
        this.setState({ answer })
    }

    render() {
        let { error, guesses, mistakes, answer } = this.state;
        const { auth: { user } } = this.props
        if (!user) return null
        return (
            <div>
                {answer ? 
                <div>
                    <div className="App-header">
                        <Hangman mistakes={mistakes} guesses={guesses} answer={answer} />
                    </div>
                    <div className="input-container">
                        {error ? <p style={styles.text}>{error}</p> : <p style={styles.text}>Guess a letter!</p>}
                        <input style={error ? styles.error : styles.input} value={this.state.value} onChange={this.onChange} onKeyDown={this.handleEnter} type={this.props.type} />
                    </div>
                </div>
                :
                <div className="App-header">
                    <h1>Lets Choose a Difficulty!</h1>
                    <div style={styles.buttonContainer}>
                        <button style={styles.button} onClick={() => this.selectDifficulty('easy')}>Easy</button>
                        <button style={styles.button} onClick={() => this.selectDifficulty('medium')}>Medium</button>
                        <button style={styles.button} onClick={() => this.selectDifficulty('hard')}>Hard</button>
                    </div>
                </div>
                }
                
            </div>
        )
    }
}

const styles = {
    input: {borderRadius: 10, width: "100%", height: 50, fontSize: 36, outline: "none"},
    error: {borderColor: "red", borderWidth: 3},
    text: {fontFamiy: fonts.bold, fontSize: 36},
    modal: {
      width: 400,
      height: 400
    },
    buttonContainer: {
        width: "100%"
    },
    button: {
        color: "#222",
        backgroundColor: "white",
        padding: "9px 18px",
        lineHeight: "1.57142857",
        border: "none",
        width: "20%",
        margin: 5,
        cursor: "pointer"
    }
}
  
styles.error = {...styles.error, ...styles.input}

const mapStateToProps = state => ({
    auth: state.auth
  })
  
  const mapDispatchToProps = {
    // dispatchAuthenticate: (userId) => authenticate(userId)
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Home)