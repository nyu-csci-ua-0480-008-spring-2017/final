import React, { Component } from 'react';
import Game from './Game'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      PLAYER_ONE_SYMBOL: "X",
      PLAYER_TWO_SYMBOL: "O",
      currentTurn:"X",
      board: [
        '','','','','','','','',''
      ],
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let id;
    let url = "http://localhost:3000/api/game/" + this.state.message;
    const req = new XMLHttpRequest();
		req.open('GET', url, true);
    req.addEventListener('load', () => {
      let game = JSON.parse(req.responseText);
      this.id = game.id;
    });
    req.send();
    console.log(id);
    this.setState({
      id:id
    });
  }

  handleChange(event) {
    this.setState({
      message:event.target.value
    })
  }


  handleWinner(index) {
    let board = this.state.board;
    board[index] = this.state.currentTurn;
    this.setState({
      board:board
    });
    let winner = this.checkForWinner();
    console.log(winner);
    if(winner !== undefined) {
      let win = winner + " wins!";
      this.setState({
        win:win,
        winner:winner
      });

      console.log("This winner is: " + winner);

      let url = "http://localhost:3000/api/game/";
      const req = new XMLHttpRequest();
  		req.open('POST', url, true);
      req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      req.send("id="+this.state.message+"&winner="+winner);


    }
  }

  handleClick(index) {
    //console.log(index);
    this.setState({
      lastIndex:index,
      currentTurn: this.state.currentTurn === this.state.PLAYER_ONE_SYMBOL ? this.state.PLAYER_TWO_SYMBOL : this.state.PLAYER_ONE_SYMBOL
    });
  }

  checkForWinner() {
    var squares = this.state.board;
    var winningCombos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    // console.log(squares);
    let winner;
    winningCombos.forEach(function(combo) {
      let c1 = combo[0];
      let c2 = combo[1];
      let c3 = combo[2];
      let s1 = squares[c1];
      let s2 = squares[c2];
      let s3 = squares[c3];
      if(s1 === s2 && s2 === s3 && s1 !== "") {
        winner = s1;
      }
    });
    return winner;
  }

  render() {
    return (
      <div className="App">
        <h1> Tic Tac Two </h1>
        <div class="log">
          <h2> To log or load your game please enter the game ID </h2>
          <h2 id="dec"> {this.state.win} </h2>
          <div class="form">
            <form onSubmit={this.handleSubmit}>
              <input type="text" onChange={this.handleChange} value={this.state.message} /> <br />
              <input type="submit" value="Enter" />
            </form>
          </div>
        </div>
        <div className="bigBoard">
        {this.state.board.map((game, index) => {
          return <Game onWinner={() => this.handleWinner(index)} onClick={() => this.handleClick()} current={this.state.currentTurn} />
        })}
        </div>
      </div>
    );
  }
}

export default App;
