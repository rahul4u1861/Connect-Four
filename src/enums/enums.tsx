import React from 'react';

export enum Player {
    None = '',
    One = 1,
    Two = 2
  }
  
 export enum GameState {
    Ongoing = -1,
    Draw = 0,
    PlayerOneWin = Player.One,
    PlayerTwoWin = Player.Two
  }