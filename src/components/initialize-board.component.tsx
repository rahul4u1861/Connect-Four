import { Player } from '../enums/enums';

export const initializeBoard = () => {
    const board = [];
    for(let i=0; i<42; i++){
      board.push(Player.None);
    }
    return board;
  }
  