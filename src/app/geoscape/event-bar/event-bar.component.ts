import {Component, OnInit} from '@angular/core';
import {UFO_REPO} from '../../../model/ufos/ufo.repo';
import {GeoscapeRendererService} from '../renderer/service/geoscape-renderer.service';
import {ModalService} from '../../_common/modals/modal.service';

@Component({
  selector: 'event-bar',
  templateUrl: './event-bar.component.html',
  styleUrls: ['./event-bar.component.scss']
})
export class EventBarComponent {
  ufos = UFO_REPO.ufos;

  constructor(private modalService: ModalService) {
  }

  openMissionsWindow() {
    this.modalService.open('missions-modal');
  }
}
