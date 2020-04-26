import { Player } from '../enums/enums';
import { Board } from '../interfaces/IState';

export const findLowestEmptyIndex = (board: Board, column: number) => {
    for(let i = 35 + column; i >= 0; i-= 7){
      if(board[i] === Player.None) return i;
    }
    return -1;
  }
  