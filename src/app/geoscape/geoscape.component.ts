import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GeoscapeRendererService} from './geoscape-renderer.service';

@Component({
  selector: 'geoscape',
  templateUrl: './geoscape.component.html',
  styleUrls: ['./geoscape.component.scss']
})
export class GeoscapeComponent implements OnInit {

  @ViewChild('container')
  elementRef: ElementRef;

  constructor(private geoscapeRenderer: GeoscapeRendererService) { }

  ngOnInit(): void {
    this.geoscapeRenderer.container = this.elementRef.nativeElement;
  }


}
