import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'simcontrol-menu',
  templateUrl: './simcontrol-menu.component.html',
  styleUrls: ['./simcontrol-menu.component.scss']
})
export class SimcontrolMenuComponent implements OnInit {

  simSpeedTypes = SimSpeed;
  simSpeed = SimSpeed.PAUSE;

  constructor() { }

  ngOnInit() {
  }

  togglePause() {
    if (this.simSpeed === SimSpeed.PAUSE) {
      this.simSpeed = SimSpeed.SPEED1;
    } else {
      this.simSpeed = SimSpeed.PAUSE;
    }
  }
}

export enum SimSpeed {
  PAUSE, SPEED1, SPEED2, SPEED3, SPEED4
}
