import React, {
    Component
} from 'react';
import { TimelineMax } from "gsap";
import DrawSVGPlugin from 'node_modules/gsap/DrawSVGPlugin'
import 'src/css/Hangman.css';
import { fonts } from 'theme';

export class Hangman extends Component {
    state = {mistakes: 0, drawn: []}
    componentDidMount() {
        var tl = new TimelineMax();
        tl.add("draw");
        tl.fromTo("#text", 0.5, {drawSVG:0}, {drawSVG:"100%"}, 0);
    }

    drawStickMan(mistakes) {
        const tl = new TimelineMax();
        if (mistakes === this.state.mistakes) return;
        switch (mistakes) {
            case 1:
                tl.add("hang");
                tl.to("#hang", 0, {"opacity": 1})
                tl.fromTo("#hang", 1, {drawSVG:0}, {drawSVG:"100%"}, 0);
                break
            case 2:
                tl.add("rope");
                tl.to("#rope", 0, {"opacity": 1})
                tl.fromTo("#rope", 1, {drawSVG:0}, {drawSVG:"100%"}, 0);
                break
            case 3:
                tl.add("head");
                tl.to("#head", 0, {"opacity": 1})
                tl.fromTo("#head", 1, {drawSVG:0}, {drawSVG:"100%"}, 0);
                break
            case 4: 
                tl.add("torso");
                tl.to("#torso", 0, {"opacity": 1})
                tl.fromTo("#torso", 1, {drawSVG:0}, {drawSVG:"100%"}, 0);
                break
            case 5: 
                tl.add("rightarm");
                tl.to("#rightarm", 0, {"opacity": 1})
                tl.fromTo("#rightarm", 1, {drawSVG:0}, {drawSVG:"100%"}, 0);
                break
            case 6: 
                tl.add("leftarm");
                tl.to("#leftarm", 0, {"opacity": 1})
                tl.fromTo("#leftarm", 1, {drawSVG:0}, {drawSVG:"100%"}, 0);
                break
            case 7: 
                tl.add("rightleg");
                tl.to("#rightleg", 0, {"opacity": 1})
                tl.fromTo("#rightleg", 1, {drawSVG:0}, {drawSVG:"100%"}, 0);
                break
            case 8: 
                tl.add("leftleg");
                tl.to("#leftleg", 0, {"opacity": 1})
                tl.fromTo("#leftleg", 1, {drawSVG:0}, {drawSVG:"100%"}, 0);
                break
            case 9: 
                tl.add("leftX");
                tl.to("#leftX", 0, {"opacity": 1})
                tl.fromTo("#leftX", 1, {drawSVG:0}, {drawSVG:"100%"}, 0);
                break
            case 10: 
                tl.add("rightX");
                tl.to("#rightX", 0, {"opacity": 1})
                tl.fromTo("#rightX", 1, {drawSVG:0}, {drawSVG:"100%"}, 0);
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
                    <div className="guessed-letter-box">
                        <h2>Guessed Letters</h2>
                        <h4>Guesses Left: {10 - mistakes}</h4>
                        <div style={styles.guesses}>
                            {guesses.map((letter, key) => <p key={key} style={styles.guessText}>{letter}</p>)}
                        </div>
                    </div>
                    <svg width={(window.innerWidth >= 320 && window.innerWidth <= 480) ? 200 : window.innerWidth/4} height="320" xmlns="http://www.w3.org/2000/svg">
                        <g id="stand">
                            <line fill="none" stroke="white" strokeWidth="3" strokeLinejoin="null" strokeLinecap="null" x1="161" y1="25" x2="161" y2="49" id="rope"/>
                            <line fill="none" stroke="white" strokeWidth="3" strokeLinejoin="null" strokeLinecap="null" x1="161" y1="26" x2="61" y2="28" id="hang"/>
                            <line fill="none" stroke="white" strokeWidth="3" strokeLinejoin="null" strokeLinecap="null" x1="61" y1="26" x2="62" y2="316" id="middle"/>
                            <line fill="none" stroke="white" strokeWidth="3" strokeLinejoin="null" strokeLinecap="null" x1="25" y1="315" x2="101" y2="315" id="bottom"/>
                        </g>
                        <svg x="145" y="63">
                            <polygon id="leftX" stroke="white" fill="none" points="10.16 1.41 8.75 0 5.08 3.67 1.41 0 0 1.41 3.67 5.08 0 8.75 1.41 10.16 5.08 6.5 8.75 10.16 10.16 8.75 6.5 5.08 10.16 1.41"/>
                        </svg>
                        <svg x="165" y="63">
                            <polygon id="rightX" stroke="white" fill="none" points="10.16 1.41 8.75 0 5.08 3.67 1.41 0 0 1.41 3.67 5.08 0 8.75 1.41 10.16 5.08 6.5 8.75 10.16 10.16 8.75 6.5 5.08 10.16 1.41"/>
                        </svg>
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
                    {answer.split("").map((letter, idx) => {
                        let className = "missing"
                        if (guesses.includes(letter)) className = "found"
                        return <span key={idx} className="letter-box" style={{width: window.innerWidth/answer.length}}><p className={`letter ${className}`} >{letter}</p></span>
                    })}
                </div>
            </div>
        )
    }
}

const styles = {
    hangman: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    letters: {
        display: "flex",
        width: "96%",
        height: "10%",
        marginLeft: "2%",
        marginRight: "2%",
        justifyContent: "center"
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