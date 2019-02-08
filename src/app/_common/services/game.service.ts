import { Injectable } from '@angular/core';
import {Game} from '../../../model/Game';

@Injectable()
export class GameService {

  private _game: Game = new Game();

  constructor() { }


  get game(): Game {
    return this._game;
  }
}
