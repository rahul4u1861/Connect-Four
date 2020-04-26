import React, { Component } from 'react';
import './App.css';
import { Player, GameState} from './enums/enums';
import { IState } from './interfaces/IState';
import { initializeBoard } from './components/initialize-board.component';
import { findLowestEmptyIndex } from './components/find-index.component';
import { togglePlayerTurn, getPrettyPlayer } from './components/player.component';
import { getGameState } from './components/game-status.component';

export default class App extends Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.getPlayerNames = this.getPlayerNames.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      board: initializeBoard(),
      playerTurn: Player.One,
      gameState: GameState.Ongoing,
      playerOneName: '',
      playerTwoName: ''
    }
  }

  // state: IState = {
  //   board: initializeBoard(),
  //   playerTurn: Player.One,
  //   gameState: GameState.Ongoing,
  //   playerOneName: '',
  //   playerTwoName: ''
  // }

  public renderCells = () => {
    const { board } = this.state;
    return board.map((player, index) => this.renderCell(player, index));
  }

  public handleOnClick = (index: number) => () => {
    const { gameState } = this.state;

    if (gameState !== GameState.Ongoing) return

    const column = index % 7;
    this.makeMove(column);
  }

  public makeMove(column: number) {
    const { board, playerTurn } = this.state;
    const index = findLowestEmptyIndex(board, column);
    
    const newBoard = board.slice();
    newBoard[index] = playerTurn;

    const gameState = getGameState(newBoard);
    console.log('gameState', gameState);

    this.setState({ 
      board: newBoard,
      playerTurn: togglePlayerTurn(playerTurn),
      gameState 
    });
  }

  public renderCell = (player: Player, index: number) => {
    return(
      <div className="cell" 
          key = { index } 
          onClick = { this.handleOnClick(index) } 
          data-player = { getPrettyPlayer(player) }>
      </div>
    );
  };

  public renderGameStatus = () => {
    const { gameState } = this.state

    let text; 
    if (gameState === GameState.Ongoing){
      text = 'Ongoing';
    }else if (gameState === GameState.Draw){
      text = 'Draw';
    }else if (gameState === GameState.PlayerOneWin){
      text = 'Player-1 wins';
    }else if (gameState === GameState.PlayerTwoWin){
      text = 'Player-2 wins';
    }

    return <div className="status">
      {text}
    </div>
  }

  public getPlayerNames (e : any) {
    this.setState({
      playerOneName: e.target.value, 
      playerTwoName: e.target.value
    });
  }

  public handleClick(e : any) {
    this.getPlayerNames(e);
    console.log(this.state.playerOneName + ' ' + this.state.playerTwoName);
  }

  public render() {
    console.log(this.state.board);
    return (
      <div className="flex-container">
        <div className="flex-child-left">
          <div>
            <div>Player 1: <input type="text" name="playerOneName" value={this.state.playerOneName} onChange={this.getPlayerNames}></input></div>
            <div>Player 2: <input type="text" name="playerTwoName" value={this.state.playerTwoName} onChange={this.getPlayerNames}></input></div>
            <div><input type="submit" value="Submit" onClick={this.handleClick}/></div>
              {/* <h2>{this.state.playerOneName} </h2> */}
          </div>
          { this.renderGameStatus() }
        </div>
        <div className="board flex-child-right">
          { this.renderCells() }
        </div>
      </div>
    )
  }
}