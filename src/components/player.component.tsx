import { Player } from '../enums/enums';

export const togglePlayerTurn = (player: Player) => {
    return player === Player.One ? Player.Two : Player.One;
  }
  
export const getPrettyPlayer = (player: Player) => {
    if (player === Player.None) 
      return 'noPlayer'
    if(player === Player.One)
      return 'playerOne'
    if(player === Player.Two)
      return 'playerTwo'
  }