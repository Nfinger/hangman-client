import React, {
    Component
} from 'react';
import { TimelineMax } from "gsap";
import DrawSVGPlugin from '../../node_modules/gsap/DrawSVGPlugin'
import '../css/Hangman.css';
import { fonts } from '../theme';

export class Hangman extends Component {
    state = {mistakes: 0}
    componentDidMount() {
        var tl = new TimelineMax();
        tl.add("draw");
        tl.fromTo("#text", 0.5, {drawSVG:0}, {drawSVG:"100%"}, 0);
    }

    drawStickMan(mistakes) {
        var tl = new TimelineMax();
        if (mistakes === this.state.mistakes) return;
        switch (mistakes) {
            case 1:
                tl.add("head");
                tl.to("#head", 0, {"opacity": 1})
                tl.fromTo("#head", 1, {drawSVG:0}, {drawSVG:"100%"}, 0);
                break
            case 2: 
                tl.add("torso");
                tl.to("#torso", 0, {"opacity": 1})
                tl.fromTo("#torso", 1, {drawSVG:0}, {drawSVG:"100%"}, 0);
                break
            case 3: 
                tl.add("rightarm");
                tl.to("#rightarm", 0, {"opacity": 1})
                tl.fromTo("#rightarm", 1, {drawSVG:0}, {drawSVG:"100%"}, 0);
                break
            case 4: 
                tl.add("leftarm");
                tl.to("#leftarm", 0, {"opacity": 1})
                tl.fromTo("#leftarm", 1, {drawSVG:0}, {drawSVG:"100%"}, 0);
                break
            case 5: 
                tl.add("rightleg");
                tl.to("#rightleg", 0, {"opacity": 1})
                tl.fromTo("#rightleg", 1, {drawSVG:0}, {drawSVG:"100%"}, 0);
                break
            case 6: 
                tl.add("leftleg");
                tl.to("#leftleg", 0, {"opacity": 1})
                tl.fromTo("#leftleg", 1, {drawSVG:0}, {drawSVG:"100%"}, 0);
                break
            default:
                break   
        }
        this.setState({mistakes})
    }
    render() {
        const { guesses, answer, mistakes } = this.props
        this.drawStickMan(mistakes)
        return (
            <div className='scene'>
                <div style={styles.hangman}>
                    <div style={styles.guessedLetterBox}>
                        <h2>Guessed Letters</h2>
                        <div style={styles.guesses}>
                            {guesses.map((letter, key) => <p key={key} style={styles.guessText}>{letter}</p>)}
                        </div>
                    </div>
                    <svg width={window.innerWidth/4} height="320" xmlns="http://www.w3.org/2000/svg">
                        <g id="stand">
                            <line fill="none" stroke="white" strokeWidth="3" strokeLinejoin="null" strokeLinecap="null" x1="161" y1="25" x2="161" y2="49" id="svg_20"/>
                            <line fill="none" stroke="white" strokeWidth="3" strokeLinejoin="null" strokeLinecap="null" x1="161" y1="26" x2="61" y2="28" id="svg_21"/>
                            <line fill="none" stroke="white" strokeWidth="3" strokeLinejoin="null" strokeLinecap="null" x1="61" y1="26" x2="62" y2="316" id="svg_23"/>
                            <line fill="none" stroke="white" strokeWidth="3" strokeLinejoin="null" strokeLinecap="null" x1="25" y1="315" x2="101" y2="315" id="svg_24"/>
                        </g>
                        <g>
                            <ellipse id="head" fill="none" stroke="white" strokeWidth="5" cx="160" cy="77" rx="25" ry="26"/>
                        </g>
                        <g>
                            <line id="torso" fill="none" stroke="white" strokeWidth="5" strokeLinejoin="null" strokeLinecap="null" x1="157" y1="100" x2="157" y2="190"/>
                        </g>
                        <g>
                            <line id="rightarm" fill="none" stroke="white" strokeWidth="3" strokeLinejoin="null" strokeLinecap="null" x1="158" y1="130" x2="204" y2="107"/>
                        </g>
                        <g>
                            <line id="leftarm" strokeWidth="3" y2="108" x2="113" y1="129" x1="157" strokeLinecap="null" strokeLinejoin="null" stroke="white" fill="none"/>
                        </g>
                        <g>
                            <line id="leftleg" fill="none" stroke="white" strokeWidth="3" strokeLinejoin="null" strokeLinecap="null" x1="156" y1="188" x2="109" y2="229"/>
                        </g>
                        <g>
                            <line id="rightleg" fill="none" stroke="white" strokeWidth="3" strokeLinejoin="null" strokeLinecap="null" x1="157" y1="187" x2="189" y2="233"/>
                        </g>
                    </svg>
                </div>
                <div style={styles.letters}>
                    <svg width={answer.length * 110} height="100" className="word">
                        {answer.split("").map((letter, idx) => {
                            let className = "missing"
                            if (guesses.includes(letter)) className = "found"
                            return (
                                <g key={idx} className="letter-group">
                                    <text className={className} fontSize={56} style={{paddingLeft: "5%"}} x={idx * 100 + 30} y="90" fill="white">{letter}</text>
                                    <line fill="none" stroke="white" strokeWidth="3" strokeLinejoin="null" strokeLinecap="null" x1={idx * 100} y1="100" x2={(idx+1) * 100 - 10} y2="100" id="svg_24"/>
                                </g>
                            )
                        })}
                    </svg>
                </div>
            </div>
        )
    }
}

const styles = {
    hangman: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    letters: {

        width: "100%",
        justifyContent: "center"
    },
    guessedLetterBox: {
        marginLeft: 20,
        marginTop: 20,
        marginRight: "20%",
        height: 250,
        width: 250,
        border: 1,
        borderStyle: "solid",
        borderColor: "white"
    },
    guesses: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        margin: 20
    },
    guessText: {
        fontSize: 24,
        fontFamily: fonts.bold,
        paddingRight: 10,
        margin: 0
    }
}