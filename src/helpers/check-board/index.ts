import { checkWin } from "../index";
import { BLOCK } from "../../pages/room";

interface IInput{
    newBoard: BLOCK[]
    isXTurn: boolean
    turnNumber: number
}

export type CheckBoardOutput = 'XWIN' | 'OWIN' | 'DRAW' | 'NONE'

export default function checkBoard({isXTurn, newBoard, turnNumber}: IInput): CheckBoardOutput{
    if(turnNumber >= 5) {
        
        if(isXTurn && checkWin(newBoard, 'x'))
            return 'XWIN'
        if(!isXTurn && checkWin(newBoard, 'o'))
            return 'OWIN'
        if(turnNumber === 9) 
            return 'DRAW'
    } 
    return 'NONE'
}