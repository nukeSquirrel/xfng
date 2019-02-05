import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GeoscapeRendererService} from './geoscape-renderer.service';

@Component({
  selector: 'geoscape-renderer',
  templateUrl: './geoscape-renderer.component.html',
  styleUrls: ['./geoscape-renderer.component.scss']
})
export class GeoscapeRendererComponent implements OnInit {

  @ViewChild('container')
  elementRef: ElementRef;

  constructor(private geoscapeRenderer: GeoscapeRendererService) { }

  ngOnInit(): void {
    this.geoscapeRenderer.container = this.elementRef.nativeElement;
  }


}
