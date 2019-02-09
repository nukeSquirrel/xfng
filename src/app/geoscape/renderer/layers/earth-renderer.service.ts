import {Injectable} from '@angular/core';
import * as THREE from 'three';
import {GeoscapeScene} from '../util/geoscape-scene';
import {calcPosFromLatLonRad} from '../util/coordinate-helpers';
import {GameService} from '../../../_common/services/game.service';
import {UfoRepo} from '../../../../model/ufos/ufo.repo';
import {Ufo} from '../../../../model/ufos/Ufo.entity';


@Injectable()
export class EarthRendererService {
  private geoscapeScene: GeoscapeScene;

  private earth = this.createEarth();

  private ufoMap = new Map<Ufo, THREE.Mesh>();
  private pointGeometry = new THREE.CircleGeometry(0.05, 8);
  private pointMaterial = new THREE.MeshBasicMaterial({
    color: 0x4444ff,
    side: THREE.BackSide
  });

  setup(geoscapeScene: GeoscapeScene) {
    this.geoscapeScene = geoscapeScene;
    this.earth = this.createEarth();
    this.geoscapeScene.scene.add(this.earth);
  }

  // TODO: extract into Earth and Ufo Renderer
  public update() {
    for (let ufo of UfoRepo.instance.ufos) {
      let ufoMesh = this.ufoMap.get(ufo);
      if (ufoMesh == null) {
        ufoMesh = this.createPoint(ufo.lat, ufo.lng);
        ufoMesh.matrixAutoUpdate = true;
        this.ufoMap.set(ufo, ufoMesh);
        this.geoscapeScene.scene.add(ufoMesh);
      } else {
        let newPosition: [number, number, number] = calcPosFromLatLonRad(ufo.lat, ufo.lng);
        ufoMesh.position.set(newPosition[0], newPosition[1], newPosition[2]);
        ufoMesh.lookAt(new THREE.Vector3(0, 0, 0));
      }
    }

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

    let mesh = new THREE.Mesh(this.pointGeometry, this.pointMaterial);

    mesh.position.set(position[0], position[1], position[2]);
    mesh.lookAt(new THREE.Vector3(0, 0, 0));
    return mesh;
  }
}
