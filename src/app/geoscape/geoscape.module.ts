import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeoscapeComponent } from './geoscape.component';
import {GeoscapeRendererComponent} from './renderer/geoscape-renderer.component';
import {GeoscapeRendererService} from './renderer/geoscape-renderer.service';
import {EarthRendererService} from './renderer/layers/earth-renderer.service';

@NgModule({
  declarations: [GeoscapeRendererComponent, GeoscapeComponent],
  imports: [
    CommonModule
  ],
  exports: [
    GeoscapeComponent
  ],
  providers: [GeoscapeRendererService, EarthRendererService]
})
export class GeoscapeModule { }
