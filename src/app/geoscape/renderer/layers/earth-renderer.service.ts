import {Injectable} from '@angular/core';
import * as THREE from 'three';
import {GeoscapeScene} from '../util/geoscape-scene';

export const EARTH_RADIUS = 7.5;

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
    let geometry = new THREE.SphereGeometry(EARTH_RADIUS, 64, 48);
    geometry.rotateY(-90 * Math.PI / 180);
    let texture: THREE.Texture = new THREE.TextureLoader().load('../../../assets/img/earth-texture.jpg');

    let material = new THREE.MeshPhongMaterial({map: texture});
    let mesh = new THREE.Mesh(geometry, material);

    return mesh;
  }

}
