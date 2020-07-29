import React, { Component } from "react";
import '../pages/style/style.scss';

type ONGOING_GAME = -1
const ONGOING_GAME = -1

enum Player {
  None = 0,
  PlayerOne = 1,
  PlayerTwo = 2 
}

interface IState{
  board: Player[];
  gameIsWon: number; 
  nextPlayerTurn: Player;
}

export default class games extends Component<{}, IState> {
    public state = {
        board: [Player.None,Player.None,Player.None,Player.None,Player.None,Player.None,Player.None,Player.None,Player.None],
        gameIsWon: ONGOING_GAME,
        nextPlayerTurn: Player.PlayerOne,
    }

    public checkIfGameIsOver = (board: Player[]) => {
        if(board[0] === board[1] && board[1] === board[2] && board[2] !== Player.None ){
        return board[0]
        } else if(board[3] === board[4] && board[4] === board[5] && board[5] !== Player.None ){
        return board[3]
        } else if(board[6] === board[7] && board[7] === board[8] && board[8] !== Player.None ){
        return board[6]
        } else if(board[0] === board[3] && board[3] === board[6] && board[6] !== Player.None ){
        return board[0]
        } else if(board[1] === board[4] && board[4] === board[7] && board[7] !== Player.None ){
        return board[1]
        } else if(board[2] === board[5] && board[5] === board[8] && board[8] !== Player.None ){
        return board[0]
        } else if(board[0] === board[4] && board[4] === board[8] && board[8] !== Player.None ){
        return board[0]
        } else if(board[2] === board[4] && board[4] === board[6] && board[6] !== Player.None ){
        return board[2]
        }

        for(const player of board){
        if(player === Player.None){
            return ONGOING_GAME;
        }
        }

        return Player.None
    }

    public createOnClickHadler = (index: number) => () => {
        const { board, nextPlayerTurn, gameIsWon } = this.state;

        if(gameIsWon !== ONGOING_GAME || board[index] !== Player.None){
        return
        }

        const newBoard = board.slice();
        newBoard[index] = nextPlayerTurn;
        const newGameIsWon = this.checkIfGameIsOver(newBoard);

        this.setState({ board: newBoard, nextPlayerTurn: 3 - nextPlayerTurn, gameIsWon : newGameIsWon});
    };

    public Cell = (index: number) => {
        const { board } = this.state;

        return <div className="cell" onClick={this.createOnClickHadler(index)} data-player={board[index]}/>;
    };

    public Status = () => {
        const { gameIsWon } = this.state;

        const winner = gameIsWon !== Player.None ? `Player ${gameIsWon} won` : `The game is drow`;

        return (
        <div>
        {"Player One is X"} <br />
        {"Player Two is O"} <br />
        {gameIsWon === ONGOING_GAME ? `Game is ongoing` : winner}
        </div>
        );
    }

    public Board = () => {
        const { board } = this.state;

        return (
        <div className="board-container">
            {board.map((value, key) => this.Cell(key))}
        </div>
        );
    };

    public clearBoard = (index: number) => {

        return(
            <div>
                <button onClick={this.createOnClickHadler(index)}>Start again</button>
            </div>
        )
    }

    render() {
        return (
            <div className="home">
                <div className="title">
                    <h1>Play tic tac toe</h1>
                </div>
                {this.Board()}
                {this.clearBoard}
                <div className="text">
                    {this.Status()}
                </div>
            </div>
        )
    }
}
