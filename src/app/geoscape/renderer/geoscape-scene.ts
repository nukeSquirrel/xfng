import * as THREE from 'three';

export class GeoscapeScene {

  scene: THREE.Scene;
  private camera: THREE.Camera;
  private renderer: THREE.WebGLRenderer;
  private defaultElements = [];

  constructor(container: HTMLElement) {
    let screen = {
      width  : window.innerWidth,
      height : container.clientHeight
    };
    let view = {
      angle  : 40,
      aspect : screen.width / screen.height,
      near   : 0.1,
      far    : 1 * 100 * 10
    };

    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer();
    this.camera = new THREE.PerspectiveCamera(view.angle, view.aspect, view. near, view.far);
    // this.camera = new THREE.OrthographicCamera(-20 * view.aspect, 20 * view.aspect, 20, -20, view.near, view.far);
    // let pointLight = new THREE.PointLight( 0xffffff );
    // pointLight.position.set(1, 1, 2);
    // this.camera.add(pointLight);

    // IDEA: if there is much polution, add a smog effect
    let light = new THREE.AmbientLight(0xffffff, 0.75);
    this.scene.add(light);
    this.defaultElements.push(light);

    let light2 = new THREE.DirectionalLight(0xffffff, 0.95);
    light2.position.x = 100;
    light2.position.y = 65;
    light2.position.z = 70; // not exactly diagonal!
    // light2.shadow.bias = 0.001;
    this.scene.add(light2);
    this.defaultElements.push(light2);
    let helper = new THREE.DirectionalLightHelper(light2);
    this.scene.add(helper);
    this.defaultElements.push(helper);
    // let hemLight = new THREE.HemisphereLight(0xffffff, 0xccccff, 1);
    // this.scene.add(hemLight);
    // this.defaultElements.push(hemLight);

    // Change perspective, so that X+Y become the "ground" and Z becomes the "height"
    // this.camera.up = new THREE.Vector3( 0, 0, 1 );

    this.scene.add(this.camera);
    this.defaultElements.push(this.camera);

    let axesHelper = new THREE.AxesHelper(20);
    this.scene.add(axesHelper);
    this.defaultElements.push(axesHelper);

    this.camera.position.set(10, 10, 10);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    this.renderer.setSize(screen.width, screen.height);
    container.appendChild(this.renderer.domElement);

    let gridHelper = new THREE.GridHelper(10 * 10, 10);
    // gridHelper.rotateX(Math.PI / 2);
    this.scene.add(gridHelper);
    this.defaultElements.push(gridHelper);

    this.render();
  }

  centerCamera(blockX: number, blockY: number, x: number, y: number) {
    // console.log(`center cam ${blockX} ${blockY} ${x} ${y} `);
    //
    //
    // let centerX = blockX * BLOCK_WIDTH_TOTAL_WIDTH + x * TILE_WIDTH;
    // let centerY = 0;
    // let centerZ = blockY * BLOCK_WIDTH_TOTAL_WIDTH + y * TILE_WIDTH;
    // this.camera.position.set(
    //   centerX + CAMERA_X,
    //   centerY + CAMERA_HEIGHT,
    //   centerZ + CAMERA_Y
    // );
    // this.camera.lookAt(new THREE.Vector3(
    //   centerX,
    //   centerY,
    //   centerZ
    // ));
    // this.controls.update(); TODO: make this work
  }

  render() {
    if (this.renderer) {
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

}
