import {Injectable} from '@angular/core';
import {GeoscapeScene} from '../util/geoscape-scene';
import {EarthRendererService} from '../layers/earth-renderer.service';
import {UfoRendererService} from '../layers/ufo-renderer.service';

/**
 * Service controlling the rendering of the geoscape scene.
 * <p>
 *     Set #container to setup the scene and render it in the passed html container element.
 * </p>
 */
@Injectable()
export class GeoscapeRendererService {
  private geoscapeScene: GeoscapeScene;

  constructor(private earthRenderer: EarthRendererService, private ufoRenderer: UfoRendererService) {
  }

  set container(container: HTMLElement) {
    this.initialize(container);
    this.render();
  }

  private initialize(container: HTMLElement) {
    this.geoscapeScene = new GeoscapeScene(container);
    this.setupLayers();
  }

  private setupLayers() {
    this.earthRenderer.setup(this.geoscapeScene);
    this.ufoRenderer.setup(this.geoscapeScene);
  }

  render() {
    this.earthRenderer.update();
    this.ufoRenderer.update();
    this.geoscapeScene.render();
  }

}
