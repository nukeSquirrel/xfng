import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeoscapeComponent } from './geoscape.component';
import {GeoscapeRendererComponent} from './renderer/geoscape-renderer.component';
import {GeoscapeRendererService} from './renderer/service/geoscape-renderer.service';
import {EarthRendererService} from './renderer/layers/earth-renderer.service';
import { SimSpeedControlMenuComponent } from './simcontrol-menu/sim-speed-control-menu.component';
import {SimLoopService} from './_common/services/sim-loop.service';

@NgModule({
  declarations: [GeoscapeRendererComponent, GeoscapeComponent, SimSpeedControlMenuComponent],
  imports: [
    CommonModule
  ],
  exports: [
    GeoscapeComponent
  ],
  providers: [GeoscapeRendererService, EarthRendererService, SimLoopService]
})
export class GeoscapeModule { }
