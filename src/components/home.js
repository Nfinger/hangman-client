import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button } from 'antd';
import '../App.css';

import { Hangman } from './hangman';
import { Signup } from './signup';
import { Api } from '../utils/Api';
import { fonts } from '../theme';

class Home extends Component {
    state = {mistakes: 0, guesses: [], answer: '', error: ''}

    handleClick = (letter) => {
        const {guesses, value, answer} = this.state
        if (!guesses.includes(letter)) {
            guesses.push(letter)
            this.setState({guesses})
            if (!answer.includes(letter)) {
                const mistakes = this.state.mistakes + 1
                this.setState({mistakes})
            }
        } else if (guesses.indexOf(letter) > -1) {
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
        let i=9,a='';
        let alphabet = [...Array(26)].map(_=>a+=(++i).toString(36))
        alphabet = alphabet[alphabet.length - 1].split("")
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
                        {alphabet.map((letter, key) => <button key={key} disabled={guesses.includes(letter)} onClick={() => this.handleClick(letter)} style={!guesses.includes(letter) ? styles.letterButton : styles.disabledLetterButton}>{letter}</button>)}
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
    },
    letterButton: {
        color: "white",
        backgroundColor: "#222",
        padding: "9px 18px",
        lineHeight: "1.57142857",
        border: "none",
        width: "10%",
        margin: 5,
        cursor: "pointer"
    },
    disabledLetterButton: {
        color: "white",
        backgroundColor: "#222",
        padding: "9px 18px",
        lineHeight: "1.57142857",
        border: "none",
        width: "10%",
        margin: 5,
        opacity: 0.3
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