import React from 'react';
import Square from './square';
import SquareLittle from './square-little';

export default class Board extends React.Component {
    constructor(props){
      super(props);
      this.state = { squares: Array(9).fill(null), xIsNext: true, history: Array()};                                                                           
    }
  
    restartGame() {
      this.setState({ squares: Array(9).fill(null), xIsNext: true, history: Array()});
      this.props.onEmptyHistory(true);   
    }
  
    renderSquare(i) {
      return <Square 
        value={this.state.squares[i]} 
        onClick={() => this.handleClick(i)} 
      />;
    }

    renderSquareLittle(value) {
      return <SquareLittle value={value} />;
    }

    rollbackPlay = () => {
        const lastPlay = this.state.history.slice(-1)[0];
        const modifiedHistory = this.state.history.slice(0, -1) ?? [];
        const newState = Object.assign({}, this.state, {squares: lastPlay, history: modifiedHistory});
        this.setState(newState);
        if(newState.history.length < 1) {
            this.props.onEmptyHistory(true);
        }
    }
  
    handleClick(i){
      const squares = this.state.squares.slice();
      if(calculateWinner(this.state.squares) || this.state.squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext === true ? "X" : "O";
      const winner = calculateWinner(squares);
      if (winner) {
        this.props.onWin(winner);
      }
      if (this.state.history.length < 1) {
        console.log("onEmptyHistory");
        this.props.onEmptyHistory(false);
      }

      this.setState({
        squares: squares, 
        xIsNext: !this.state.xIsNext, 
        history: [...this.state.history, this.state.squares]
      });

      console.log(this.state.history);
    }
  
    render() {
      const winner = calculateWinner(this.state.squares);
      let status = "";
      if(winner) {
        status = "Winner " + winner;
      } else if (this.state.history.length > 8 && winner === null) {
        status = "It's a draw"; 
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
          <div>
          Last Plays:            
            {this.state.history.map(play => 
                <li>{play[0]}
                  <div className="board-row">
                    {this.renderSquareLittle(play[0])}
                    {this.renderSquareLittle(play[1])}
                    {this.renderSquareLittle(play[2])}
                  </div>
                  <div className="board-row">
                    {this.renderSquareLittle(play[3])}
                    {this.renderSquareLittle(play[4])}
                    {this.renderSquareLittle(play[5])}
                  </div>
                  <div className="board-row">
                    {this.renderSquareLittle(play[6])}
                    {this.renderSquareLittle(play[7])}
                    {this.renderSquareLittle(play[8])}
                  </div>
                </li>)
            }            
          </div>
        </div>
      );
    }
  }


  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }