import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeoscapeComponent } from './geoscape.component';
import {GeoscapeRendererComponent} from './renderer/geoscape-renderer.component';

@NgModule({
  declarations: [GeoscapeRendererComponent, GeoscapeComponent],
  imports: [
    CommonModule
  ],
  exports: [
    GeoscapeComponent
  ]
})
export class GeoscapeModule { }
