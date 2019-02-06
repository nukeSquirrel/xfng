import * as THREE from 'three';
import {OrbitControls} from '../../../lib/orbit-controls';

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

    let mesh	= this.createEarth();
    this.scene.add(mesh);

    this.scene.add(this.createPoint());

    this.lastTimeMsec = null;
    setInterval(() => {
      this.render();
    }, 1000 / 25);
    // requestAnimationFrame(this.animate);
  }

  render() {
    if (this.renderer) {
      console.log('render');
      this.renderer.render(this.scene, this.camera);
    }
  }

  clear() {
    if (this.scene) {
      while (this.scene.children.length > 0) {
        this.scene.remove(this.scene.children[0]);
      }

      for (let de of this.defaultElements) {
        this.scene.add(de);
      }
    }
  }

  private createEarth() {
    // TODO move to a new renderer
    let geometry	= new THREE.SphereGeometry(7.5, 64, 48);
    // let material	= new THREE.MeshPhongMaterial({
    //   map		: THREE.ImageUtils.loadTexture('http://i.imgur.com/puZgGjm.jpg'),
    //
    // })
    let texture: THREE.Texture = new THREE.TextureLoader().load('../../../assets/img/earth-texture.jpg');

    let material = new THREE.MeshPhongMaterial({map: texture});
    let mesh = new THREE.Mesh(geometry, material);
    // let mesh	= new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({wireframe: true, color: 0x4444FF}));

    return mesh;
  }

  private calcPosFromLatLonRad(lat, lon): [number, number, number] {
    let phi = (90 - lat) * (Math.PI / 180);
    let theta = (lon + 180) * (Math.PI / 180);

    let x = -(7.5 * Math.sin(phi) * Math.cos(theta));
    let z = (7.5 * Math.sin(phi) * Math.sin(theta));
    let y = (7.5 * Math.cos(phi));

    return [x, y, z];
  }

  private createPoint() {
    let position: [number, number, number] = this.calcPosFromLatLonRad(50.941357, 6.958307);

    let geometry	= new THREE.SphereGeometry(0.025, 20, 20);
    let material	= new THREE.MeshBasicMaterial({
      color: new THREE.Color('white')
    });
    let mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(position[0], position[1], position[2]);
    return mesh;
  }

}
