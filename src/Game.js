import React, { Component } from 'react';
import './App.css';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PLAYER_ONE_SYMBOL: "X",
      PLAYER_TWO_SYMBOL: "O",
      currentTurn:"X",
      board: [
        '','','','','','','','',''
      ]
    }
    this.checkForWinner = this.checkForWinner.bind(this);
  }

  handleClick(index) {
    if(this.state.board[index] === '') {
      this.props.onClick(index);
      let board = this.state.board
      board[index] = this.props.current
      this.setState({
        board: board,
        currentTurn: this.state.currentTurn === this.state.PLAYER_ONE_SYMBOL ? this.state.PLAYER_TWO_SYMBOL : this.state.PLAYER_ONE_SYMBOL
      })
      let winner = this.checkForWinner();
      if(winner !== undefined) {
        if(this.state.winner === undefined) {
          this.props.onWinner(this.props.index);
          console.log(winner);
          this.setState({
            winner:winner
          });
        }
      }
    }
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
      <div className="board">
      {this.state.board.map((cell, index) => {
        return <div onClick={() => this.handleClick(index)} className="square">{cell}</div>;
      })}
      </div>
    );
  }
}

export default Game;
