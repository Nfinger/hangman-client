import React, { Component } from 'react';
import { connect } from "react-redux";
import Modal from 'react-responsive-modal';
import '../App.css';
import { Hangman } from './hangman';
import { Signup } from './signup';
import { Api } from '../utils/Api';
import { fonts } from '../theme';

import { gameOver } from '../utils/action';
class Home extends Component {
    state = {
        mistakes: 0,
        guesses: [],
        answer: '',
        correct: [],
        finished: false,
        win: false,
        error: '',
        game: '',
        open: false
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };
    
    onCloseModal = () => {
        if (this.state.finished) this.reset()
        this.setState({ open: false });
    };

    handleClick = (letter) => {
        let {guesses, value, answer, correct, finished, win, open, mistakes} = this.state
        if (!guesses.includes(letter)) {
            guesses.push(letter)
            if (answer.includes(letter)) correct.push(letter);
            if (answer.split("").filter(letter => !correct.includes(letter)).length === 0) {
                finished = true;
                win = true;
                open = true;
                this.props.dispatchGameOver(this.state.game, win, correct.length, mistakes)
                setTimeout(() => {
                    this.setState({open, win, finished})
                }, 300)
            }
            if (!answer.includes(letter)) {
                mistakes++
                if (mistakes === 10) {
                    finished = true;
                    open = true;
                    this.props.dispatchGameOver(this.state.game, win, correct.length, mistakes)
                    setTimeout(() => {
                        this.setState({open, win, finished})
                    }, 1000)
                }
            }

            this.setState({mistakes, guesses})
        } else if (guesses.indexOf(letter) > -1) {
            this.setState({error: "You have already guessed that letter. Try another one!"})
            this.timeout = setTimeout(() => {this.setState({error: ""})}, 2000)
        }
    }
    
    byteArrayToString(byteArray) {
        var str = "", i;
        for (i = 0; i < byteArray.length; ++i) {
            str += escape(String.fromCharCode(byteArray[i]));
        }
        return str;
    }

    decryptMsg(cipherText) {
        const decrypted = this.byteArrayToString(cipherText)
        return decrypted;
     }

    selectDifficulty = async (difficulty) => {
        const { auth: { user } } = this.props
        const res = await Api.newGame(user.id, difficulty)
        const { answer, id } = res.data
        this.setState({ answer: this.decryptMsg(answer), game: id })
    }

    reset = () => {
        this.setState({
            mistakes: 0,
            guesses: [],
            answer: '',
            correct: [],
            finished: false,
            win: false,
            error: '',
            open: false
        })
    }

    render() {
        let { 
            error,
            guesses,
            mistakes,
            answer,
            finished,
            win,
            open
        } = this.state;

        let i=9,a='';
        let alphabet = [...Array(26)].map(_=>a+=(++i).toString(36))
        alphabet = alphabet[alphabet.length - 1].split("")
        const { auth: { user } } = this.props
        if (!user) {
            return (
                <div className="App-header">
                    <h1>Hey There!</h1>
                    <h2>Please log in or sign up to play!</h2>
                </div>
            )
        }
        return (
            <div>
                {answer ? 
                <div>
                    <div className="App-header">
                        <Hangman mistakes={mistakes} guesses={guesses} answer={answer} />
                    </div>
                    <div className="guess-container">
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
                {finished && <Modal open={open} onClose={this.onCloseModal}>
                    {
                        win ? 
                        <div className="gif-container">
                            <h1>You Won!</h1>
                            <img className="finished-gif" src={require('../assets/office.gif')} />
                            <button onClick={this.reset} style={styles.playAgain}>Play Again!</button>
                        </div>
                        :
                        <div className="gif-container">
                            <h1>You Lost!</h1>
                            <button onClick={this.reset} style={styles.playAgain}>Play Again!</button>
                        </div>
                    }
                </Modal>}
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
        width: "26%",
        margin: 5,
        cursor: "pointer"
    },
    playAgain: {
        color: "white",
        backgroundColor: "#222",
        padding: "9px 18px",
        lineHeight: "1.57142857",
        border: "none",
        width: "60%",
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
    dispatchGameOver: (gameId, outcome, correct, incorrect) => gameOver(gameId, outcome, correct, incorrect)
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Home)