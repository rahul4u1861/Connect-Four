import { Player, GameState } from '../enums/enums';

export type Board = Player[];

export interface IState {
    board: Board;
    playerTurn: Player;
    gameState: GameState | Player;
    playerOneName: string,
    playerTwoName: string
  }