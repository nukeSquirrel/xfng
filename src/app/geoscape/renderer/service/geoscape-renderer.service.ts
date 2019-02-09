import {Injectable} from '@angular/core';
import {GeoscapeScene} from '../util/geoscape-scene';
import {EarthRendererService} from '../layers/earth-renderer.service';

@Injectable()
export class GeoscapeRendererService {
  private geoscapeScene: GeoscapeScene;

  constructor(private earthRenderer: EarthRendererService) {
  }

  set container(container: HTMLElement) {
    this.geoscapeScene = new GeoscapeScene(container);
    this.geoscapeScene.render();
    this.setupLayers();
    this.render();
  }

  private setupLayers() {
    this.earthRenderer.setup(this.geoscapeScene);
  }

  render() {
    this.earthRenderer.update();
    this.geoscapeScene.render();
  }

}
