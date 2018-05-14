import React, { Component } from 'react';

export class InputField extends Component {
    state = {value: ''}
    onChange = ({target: {value}} = {}) => {
        this.setState({value},
        () => {
            this.props.onChange(this.state.value)
        })
    }

    handleEnter = ({key}) => {
        if (key === "Enter" && this.state.value.length > 0) console.log("HERNETE")
    }

    render() {
        return (
            <input value={this.state.value} onChange={this.onChange} onKeyDown={this.handleEnter} type={this.props.type} />
        )
    }
}