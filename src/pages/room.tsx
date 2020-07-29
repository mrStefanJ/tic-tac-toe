import React, { useState } from 'react'
import { checkBoard } from '../helpers/index';
import { useParams, useHistory } from 'react-router-dom';
import './style/style.scss'

export type SYMBOL = 'x' | 'o'
export type BLOCK = SYMBOL | '-';

const Room = (props:{apikey:string}) => {
    const { id } = useParams()
    const [board, setBoard] = useState<BLOCK[]>([
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
    ])

    const [startingTurn, setStartingTurn] = useState<SYMBOL>('x');
    const [isXTurn, setIsXTurn] = useState<boolean>(startingTurn === 'x');
    const [turnNumber, setTurnNumber] = useState<number>(1);
    const [message, setMessage] = useState<string>(`${startingTurn.toUpperCase()}'s Turn`);
    const [gameDone, setGameDone] = useState<boolean>(false);
    const history = useHistory();

    function handleClick(index: number){
        if(board[index] === '-' && !gameDone) {
            const newBoard = [...board]
            newBoard[index] = isXTurn ? 'x' : 'o'

            //check if game is done
            const outcome = checkBoard({newBoard, isXTurn, turnNumber});

            switch (outcome) {
                case 'XWIN':{
                    setMessage(`X WIN`)
                    setGameDone(true)
                    break;
                }
                case 'OWIN':{
                    setMessage(`O WIN`)
                    setGameDone(true)
                    break;
                }
                case 'DRAW':{
                    setMessage(`It is DRAW`)
                    setGameDone(true)
                    break;
                }
                case 'NONE':
                    default:
                        setMessage(`${isXTurn ? 'O' : 'X'}'s Turn`)
            }

            setTurnNumber(turnNumber + 1);
            setIsXTurn(!isXTurn);
            setBoard(newBoard);
        }
    }

    function handleClear(){
        setStartingTurn(startingTurn === 'x' ? 'o' : 'x')
        setIsXTurn(startingTurn === 'x')
        setMessage(`${startingTurn.toUpperCase()}'s Turn`)
        setBoard([
            '-',
            '-',
            '-',
            '-',
            '-',
            '-',
            '-',
            '-',
            '-',
        ]) 
        setGameDone(false)
        setTurnNumber(1)
    }

    function goBack(){
        history.push('/')
    }

    return (
        <div className="room h-center">
            <p className="result">{message}</p>
            <div className="table">
                <div className="row">
                    <div onClick={() => handleClick(0)} className="block">{board[0] !== '-' && board[0]}</div>
                    <div onClick={() => handleClick(1)} className="block">{board[1] !== '-' && board[1]}</div>
                    <div onClick={() => handleClick(2)} className="block">{board[2] !== '-' && board[2]}</div>
                </div>
                <div className="row">
                    <div onClick={() => handleClick(3)} className="block">{board[3] !== '-' && board[3]}</div>
                    <div onClick={() => handleClick(4)} className="block">{board[4] !== '-' && board[4]}</div>
                    <div onClick={() => handleClick(5)} className="block">{board[5] !== '-' && board[5]}</div>
                </div>
                <div className="row">
                    <div onClick={() => handleClick(6)} className="block">{board[6] !== '-' && board[6]}</div>
                    <div onClick={() => handleClick(7)} className="block">{board[7] !== '-' && board[7]}</div>
                    <div onClick={() => handleClick(8)} className="block">{board[8] !== '-' && board[8]}</div>
                </div>
            </div>  
            <div className="btn-wrapper">
                <button onClick={handleClear} className="btn">Clear</button>
                <button onClick={goBack} className="btn">Back to Home Page</button>
            </div>
        </div>
    )
}

export default Room;