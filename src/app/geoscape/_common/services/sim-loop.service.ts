import { Injectable } from '@angular/core';
import {GameService} from '../../../_common/services/game.service';
import {Game} from '../../../../model/Game';

export enum SimSpeed {
  // number x means "x ticks per second"
  PAUSE = 0,
  SPEED1 = 1,
  SPEED2 = 5,
  SPEED3 = 10,
  SPEED4 = 25
}

@Injectable()
export class SimLoopService {

  private static readonly DEFAULT_SPEED: SimSpeed = SimSpeed.SPEED2;

  private _simSpeed = SimSpeed.PAUSE;
  private intervalId: number;

  private game: Game;

  constructor(gameService: GameService) {
    this.game = gameService.game;
  }

  tick() {
    this.game.tick(1);
  }


  get simSpeed(): SimSpeed {
    return this._simSpeed;
  }

  set simSpeed(value: SimSpeed) {
    // TODO: use constant loop speed and alter tick-count instead!
    this._simSpeed = value;
    this.clearInterval();
    if (this._simSpeed !== SimSpeed.PAUSE) {
      let ticksPerSec: number = this._simSpeed;
      this.intervalId = setInterval(() => {
        this.tick();
      }, 1000 / ticksPerSec);
    }
  }

  private clearInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  togglePause() {
    if (this._simSpeed === SimSpeed.PAUSE) {
      this.simSpeed = SimLoopService.DEFAULT_SPEED;
    } else {
      this.simSpeed = SimSpeed.PAUSE;
    }
  }
}
