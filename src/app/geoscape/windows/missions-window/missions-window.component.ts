import { Component, OnInit } from '@angular/core';
import {UFO_REPO} from '../../../../model/ufos/ufo.repo';
import {Ufo} from '../../../../model/ufos/Ufo.entity';
import {ModalContent} from '../../../_common/modals/modal.api';
import {LocalDataSource} from 'ng2-smart-table';

@Component({
  selector: 'app-missions-window',
  templateUrl: './missions-window.component.html',
  styleUrls: ['./missions-window.component.scss']
})
export class MissionsWindowComponent implements ModalContent {
  tableSettings = {
    columns: {
      id: {title: 'ID'}
    },
    actions: {add: false, edit: false, delete: false}
  };

  ufos: LocalDataSource = new LocalDataSource(UFO_REPO.ufos);
  constructor() {}

  onShow(): boolean {
    this.ufos.refresh();
    return true;
  }

}
