import { Component, OnInit } from '@angular/core';
import {UFO_REPO} from '../../../../model/ufos/ufo.repo';
import {Ufo} from '../../../../model/ufos/Ufo.entity';
import {ModalContent} from '../../../_common/modals/modal.api';
import {LocalDataSource} from 'ng2-smart-table';
import {GeoscapeRendererService} from '../../renderer/service/geoscape-renderer.service';

@Component({
  selector: 'app-missions-window',
  templateUrl: './missions-window.component.html',
  styleUrls: ['./missions-window.component.scss']
})
export class MissionsWindowComponent implements ModalContent {
  tableSettings = {
    columns: {
      id: {
        title: 'ID',
        valuePrepareFunction: (val) => 'UFO-' + val,
      },
      discoverDate: {
        title: 'Discovered',
        valuePrepareFunction: (val: Date) => val.toLocaleDateString()
      }
    },
    hideSubHeader: true,
    actions: {add: false, edit: false, delete: false}
  };

  ufos: LocalDataSource = new LocalDataSource(UFO_REPO.ufos);

  constructor(private geoscapeRenderer: GeoscapeRendererService) {}

  onShow(): boolean {
    this.ufos.refresh();
    return true;
  }

  selectUfo(event: any) {
    let ufo: Ufo = event.data;
    this.focusUfo(ufo);
  }

  focusUfo(ufo: Ufo) {
    this.geoscapeRenderer.geoscapeScene.focus(ufo);
  }
}
