import {Injectable} from '@angular/core';
import {GeoscapeScene} from './geoscape-scene';

@Injectable()
export class GeoscapeRendererService {
  private geoscapeScene: GeoscapeScene;

  set container(container: HTMLElement) {
    this.geoscapeScene = new GeoscapeScene(container);
    this.render();
  }

  render() {
    this.geoscapeScene.render();
  }
}
