import { Component, OnInit } from '@angular/core';
import {GameService} from '../../_common/services/game.service';
import {Game} from '../../../model/Game';
import {SimLoopService, SimSpeed} from '../_common/services/sim-loop.service';

@Component({
  selector: 'simcontrol-menu',
  templateUrl: './sim-speed-control-menu.component.html',
  styleUrls: ['./sim-speed-control-menu.component.scss']
})
export class SimSpeedControlMenuComponent implements OnInit {

  simSpeedTypes = SimSpeed;

  private game: Game;

  constructor(private simLoop: SimLoopService, gameService: GameService) {
    this.game = gameService.game;
  }

  ngOnInit() {
  }

  togglePause() {
    this.simLoop.togglePause();
  }

  get simSpeed(): SimSpeed {
    return this.simLoop.simSpeed;
  }

  set simSpeed(value: SimSpeed) {
    this.simLoop.simSpeed = value;
  }


}

