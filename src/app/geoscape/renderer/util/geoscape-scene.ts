import * as THREE from 'three';
import {OrbitControls} from '../../../../lib/orbit-controls';
import {HasCoords} from '../../../../model/common/geo.api';
import {calcPosFromLatLonRad, calcSphericalFromLatLon, normalize} from './coordinate-helpers';
import {EARTH_RADIUS} from '../layers/earth-renderer.service';

/**
 * Wrapper for the ThreeJS scene for the Geoscape, containing all basic elements like camera, ThreeJS-Renderer, Mouse-Controls etc.
 */
export class GeoscapeScene {

  scene: THREE.Scene;
  private camera: THREE.Camera;
  private renderer: THREE.WebGLRenderer;
  private defaultElements = [];
  private lastTimeMsec;

  private controls: OrbitControls;

  private controlsListener = () => { this.render(); };

  constructor(container: HTMLElement) {
    let screen = {
      width  : window.innerWidth,
      height : container.clientHeight
    };
    let view = {
      angle  : 45,
      aspect : screen.width / screen.height,
      near   : 0.01,
      far    : 100
    };

    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer();
    this.camera = new THREE.PerspectiveCamera(view.angle, view.aspect, view. near, view.far);

    this.scene.add(this.camera);
    this.defaultElements.push(this.camera);

    let light = new THREE.AmbientLight(0xffffff, 0.75);
    this.scene.add(light);
    this.defaultElements.push(light);

    let axesHelper = new THREE.AxesHelper(20);
    this.scene.add(axesHelper);
    this.defaultElements.push(axesHelper);

    this.camera.position.set(12, 12, 12);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    let controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.rotateSpeed = 0.35;
    controls.zoomSpeed = 2.0;
    controls.enablePan = false;

    controls.update();
    controls.addEventListener( 'change', this.controlsListener);


    this.renderer.setSize(screen.width, screen.height);
    container.appendChild(this.renderer.domElement);

    // let gridHelper = new THREE.GridHelper(10 * 10, 10);
    // // gridHelper.rotateX(Math.PI / 2);
    // this.scene.add(gridHelper);
    // this.defaultElements.push(gridHelper);

    // this.lastTimeMsec = null;
    // setInterval(() => {
    //   this.render();
    // }, 1000 / 25);
    // requestAnimationFrame(this.animate);
  }

  render() {
    if (this.renderer) {
      // console.log('render');
      this.renderer.render(this.scene, this.camera);
    }
  }
  //
  // clear() {
  //   if (this.scene) {
  //     while (this.scene.children.length > 0) {
  //       this.scene.remove(this.scene.children[0]);
  //     }
  //
  //     for (let de of this.defaultElements) {
  //       this.scene.add(de);
  //     }
  //   }
  // }

  focus(geoObject: HasCoords) {
    // TODO add animation indicating which object is focused (a litte *blink* *fade-out* animation)
    geoObject = normalize(geoObject);
    let spherical = calcSphericalFromLatLon(geoObject.lat, geoObject.lng);
    this.controls.lookAtSpherical(spherical.phi, spherical.theta);
    this.render();
  }
}
