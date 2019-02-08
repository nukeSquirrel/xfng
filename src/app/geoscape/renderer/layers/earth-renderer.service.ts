import {Injectable} from '@angular/core';
import * as THREE from 'three';
import {RenderLayer} from './renderer.api';
import {GeoscapeScene} from '../util/geoscape-scene';
import {calcPosFromLatLonRad} from '../util/coordinate-helpers';


@Injectable()
export class EarthRendererService implements RenderLayer {
  private geoscapeScene: GeoscapeScene;

  setup(geoscapeScene: GeoscapeScene) {
    this.geoscapeScene = geoscapeScene;
  }

  public render() {
    this.geoscapeScene.scene.add(this.createEarth());
    this.geoscapeScene.scene.add(this.createPoint(50.941357, 6.958307));
  }

  private createEarth(): THREE.Mesh {
    let geometry = new THREE.SphereGeometry(7.5, 64, 48);
    let texture: THREE.Texture = new THREE.TextureLoader().load('../../../assets/img/earth-texture.jpg');

    let material = new THREE.MeshPhongMaterial({map: texture});
    let mesh = new THREE.Mesh(geometry, material);

    return mesh;
  }

  private createPoint(lat: number, lon: number) {
    let position: [number, number, number] = calcPosFromLatLonRad(lat, lon);

    let geometry = new THREE.CircleGeometry(0.05, 8);
    let material = new THREE.MeshBasicMaterial({
      color: 0x4444ff,
      side: THREE.BackSide
    });
    let mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(position[0], position[1], position[2]);
    mesh.lookAt(new THREE.Vector3(0, 0, 0));
    return mesh;
  }
}
