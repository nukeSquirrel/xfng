import {Injectable} from '@angular/core';
import * as THREE from 'three';
import {GeoscapeScene} from '../util/geoscape-scene';


@Injectable()
export class EarthRendererService {
  private geoscapeScene: GeoscapeScene;

  private earth = this.createEarth();

  setup(geoscapeScene: GeoscapeScene) {
    this.geoscapeScene = geoscapeScene;
    this.earth = this.createEarth();
    this.geoscapeScene.scene.add(this.earth);
  }

  public update() {
    // Earth does not need to be updated yet.
  }

  private createEarth(): THREE.Mesh {
    let geometry = new THREE.SphereGeometry(7.5, 64, 48);
    let texture: THREE.Texture = new THREE.TextureLoader().load('../../../assets/img/earth-texture.jpg');

    let material = new THREE.MeshPhongMaterial({map: texture});
    let mesh = new THREE.Mesh(geometry, material);

    return mesh;
  }

}
