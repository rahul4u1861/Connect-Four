import { Board } from '../interfaces/IState';
import { Player, GameState } from '../enums/enums';

export const getGameState = (board: Board) => {
    //check for horizontal wins
    for(let r = 0; r < 6; r++){
      for (let c = 0; c <= 4; c++){
        const index = r * 7 + c;
        const boardSlice = board.slice(index, index + 4)
    
        const winningResult = checkWinningState(boardSlice)
        if(winningResult !== false) 
          return winningResult;
      }
    }
    //check for vertical wins
    for(let r = 0; r <= 2; r++){
      for (let c = 0; c < 7; c++){
        const index = r * 7 + c;
        const boardSlice = [
          board[index],
          board[index + 7],
          board[index + 7 * 2],
          board[index + 7 * 3]
        ];
    
        const winningResult = checkWinningState(boardSlice)
        if(winningResult !== false) 
          return winningResult;
      }
    }
    //check for diagonal wins
    for(let r = 0; r <= 2; r++){
      for (let c = 0; c < 7; c++){
        const index = r * 7 + c;
        //checks diagonal down->left
        if(c >= 3){
          const boardSlice = [
            board[index],
            board[index + 7 - 1],
            board[index + 7 * 2 - 2],
            board[index + 7 * 3 - 3]
          ];
          const winningResult = checkWinningState(boardSlice)
          if(winningResult !== false) 
            return winningResult;
        }
        //checks diagonal down->right
        if(c <= 3){
          const boardSlice = [
            board[index],
            board[index + 7 + 1],
            board[index + 7 * 2 + 2],
            board[index + 7 * 3 + 3]
          ];
          const winningResult = checkWinningState(boardSlice)
          if(winningResult !== false) 
            return winningResult;
        }
      }
    }
  
    if(board.some(cell => cell === Player.None)){
      return GameState.Ongoing;
    }else{
      return GameState.Draw;
    }
  }
  
  export const checkWinningState = (miniBoard: Player[]) => {
    if(miniBoard.some(cell => cell === Player.None)) 
        return false;
  
    if(miniBoard[0] === miniBoard[1] &&
      miniBoard[1] === miniBoard[2] &&
      miniBoard[2] === miniBoard[3]){
        return miniBoard[1];
      }
    return false;
  }