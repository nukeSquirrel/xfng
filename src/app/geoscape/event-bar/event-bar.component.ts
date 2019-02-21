import {Component, OnInit} from '@angular/core';
import {UFO_REPO} from '../../../model/ufos/ufo.repo';
import {GeoscapeRendererService} from '../renderer/service/geoscape-renderer.service';

@Component({
  selector: 'event-bar',
  templateUrl: './event-bar.component.html',
  styleUrls: ['./event-bar.component.scss']
})
export class EventBarComponent implements OnInit {
  ufos = UFO_REPO.ufos;


  constructor(private geoscapeRenderer: GeoscapeRendererService) {
    // this.ufoCount = UFO_REPO.ufos.length;
  }

  ngOnInit() {
  }

  focusFirst() {
    console.log('focus');
    this.geoscapeRenderer.geoscapeScene.focus(this.ufos[0]);
  }
}
