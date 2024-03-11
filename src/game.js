import React from 'react';
import Board from './board';


export default class Game extends React.Component {

    constructor(props){
      super(props);
      this.state = {numOfXWins: 0, numOfOWins: 0, noMorePlays: true};
      this.handleWin = this.handleWin.bind(this);
      this.boardRef = React.createRef();
    }
  
    handleRestart = () => {
      this.boardRef.current.restartGame();
    }
  
    handleWin(winner) {
      console.log("We have a winner!", winner);
      if(winner === 'X'){
        this.setState((state) => Object.assign({}, state, {numOfXWins: state.numOfXWins + 1}));
      } else if(winner === 'O'){
        this.setState((state) => Object.assign({}, state, {numOfOWins: state.numOfOWins + 1}));
      }
    }

    rollbackPlay = () => {
        this.boardRef.current.rollbackPlay();
    }

    handleEmptyHistory = (isEmpty) => {
        this.setState((state) => Object.assign({}, state, {noMorePlays: isEmpty}));
    }
  
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board onWin={this.handleWin} onEmptyHistory={this.handleEmptyHistory} ref={this.boardRef} />
          </div>
          <div className="game-info">
            <div>{'Statistics'}</div>
            <ol>{'X wins: '+this.state.numOfXWins}</ol>
            <ol>{'O wins: '+this.state.numOfOWins}</ol>
            <ol><button onClick={this.handleRestart}>Restart Game</button></ol>
            <ol><button disabled={this.state.noMorePlays} onClick={this.rollbackPlay}>RollBack</button></ol>      
          </div> 
        </div>
      );
    }
  }