import React, { Component } from 'react';
import './App.css';

class Log extends Component {
  constructor(props) {
    super(props);
    this.state ={
      message:""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let message = this.state.message;
    this.props.handleLogin(message);

  }

  handleChange(event) {
    this.setState({
      message:event.target.value
    })
    console.log(this.state.message);
  }


  render() {
    return (
      <div class="log">
        <h2> To log or load your game please enter the game ID </h2>
        <div class="form">
          <form onSubmit={this.handleSubmit}>
            <input type="text" onChange={this.handleChange} value={this.state.message} /> <br />
            <input type="submit" value="Enter" />
          </form>
        </div>
      </div>
    );
  }
}

export default Log;
