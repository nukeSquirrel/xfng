import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GeoscapeComponent} from './geoscape.component';
import {GeoscapeRendererComponent} from './renderer/geoscape-renderer.component';
import {GeoscapeRendererService} from './renderer/service/geoscape-renderer.service';
import {EarthRendererService} from './renderer/layers/earth-renderer.service';
import {SimSpeedControlMenuComponent} from './simcontrol-menu/sim-speed-control-menu.component';
import {SimLoopService} from './_common/services/sim-loop.service';
import {UfoRendererService} from './renderer/layers/ufo-renderer.service';
import {EventBarComponent} from './event-bar/event-bar.component';
import {MissionsWindowComponent} from './windows/missions-window/missions-window.component';
import {ModalComponent} from '../_common/modals/modal.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';

@NgModule({
  declarations: [GeoscapeRendererComponent, GeoscapeComponent, SimSpeedControlMenuComponent, EventBarComponent, MissionsWindowComponent,
    ModalComponent // this should better be declared in a projects "shared" module which all modules can import.
  ],
  imports: [
    CommonModule, Ng2SmartTableModule
  ],
  exports: [
  ],
  providers: [
    SimLoopService, GeoscapeRendererService, EarthRendererService, UfoRendererService,
  ]
})
export class GeoscapeModule { }
