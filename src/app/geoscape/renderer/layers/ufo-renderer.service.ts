import {Injectable} from '@angular/core';
import {UFO_REPO} from '../../../../model/ufos/ufo.repo';
import {calcPosFromLatLonRad} from '../util/coordinate-helpers';
import * as THREE from 'three';
import {Ufo} from '../../../../model/ufos/Ufo.entity';
import {GeoscapeScene} from '../util/geoscape-scene';
import {GameService} from '../../../_common/services/game.service';
import {Game} from '../../../../model/Game';

@Injectable({
  providedIn: 'root'
})
export class UfoRendererService {

  private game: Game;

  private ufoMap = new Map<Ufo, THREE.Mesh>();
  private pointGeometry;
  private pointMaterial;

  private geoscapeScene: GeoscapeScene;

  constructor(gameService: GameService) {
    this.game = gameService.game;
  }

  setup(geoscapeScene: GeoscapeScene) {
    this.geoscapeScene = geoscapeScene;
    this.initGeoObjects();
  }

  private initGeoObjects() {
    this.pointGeometry = new THREE.CircleGeometry(0.05, 8);
    this.pointMaterial = new THREE.MeshBasicMaterial({
      color: 0x4444ff,
      side: THREE.BackSide
    });
  }

  public update() {
    for (let ufo of UFO_REPO.ufos) {
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

  private createPoint(lat: number, lon: number) {
    let position: [number, number, number] = calcPosFromLatLonRad(lat, lon);

    let mesh = new THREE.Mesh(this.pointGeometry, this.pointMaterial);

    mesh.position.set(position[0], position[1], position[2]);
    mesh.lookAt(new THREE.Vector3(0, 0, 0));
    return mesh;
  }

}
