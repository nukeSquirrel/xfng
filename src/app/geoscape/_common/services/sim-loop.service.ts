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

  /**
   * Controls the Speed of the interval.
   */
  private static readonly LOOPS_PER_SECOND = 25;

  private _simSpeed = SimSpeed.PAUSE;
  private intervalId: number;
  private millisSinceLastTick = 0;

  private game: Game;

  constructor(gameService: GameService) {
    this.game = gameService.game;
  }

  loop() {
    this.millisSinceLastTick += 1000 / SimLoopService.LOOPS_PER_SECOND;
    let millisPerTick: number = 1000 / this._simSpeed;

    if (this.millisSinceLastTick >= millisPerTick) {
      this.game.tick(Math.round(this.millisSinceLastTick / millisPerTick));
      this.millisSinceLastTick = this.millisSinceLastTick % millisPerTick;
    }
  }


  get simSpeed(): SimSpeed {
    return this._simSpeed;
  }

  set simSpeed(value: SimSpeed) {
    this._simSpeed = value;
    this.clearInterval();
    if (this._simSpeed !== SimSpeed.PAUSE) {
      this.intervalId = window.setInterval(() => {
        this.loop();
      }, 1000 / SimLoopService.LOOPS_PER_SECOND);
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
