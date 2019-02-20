import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UFO_REPO} from '../../../model/ufos/ufo.repo';

@Component({
  selector: 'event-bar',
  templateUrl: './event-bar.component.html',
  styleUrls: ['./event-bar.component.scss']
})
export class EventBarComponent implements OnInit {
  ufos = UFO_REPO.ufos;


  constructor() {
    // this.ufoCount = UFO_REPO.ufos.length;
  }

  ngOnInit() {
  }

}
