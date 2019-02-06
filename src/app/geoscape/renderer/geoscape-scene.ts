import * as THREE from 'three';

export class GeoscapeScene {

  scene: THREE.Scene;
  private camera: THREE.Camera;
  private renderer: THREE.WebGLRenderer;
  private defaultElements = [];
  private lastTimeMsec;

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

    this.camera.position.set(10, 10, 10);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    this.renderer.setSize(screen.width, screen.height);
    container.appendChild(this.renderer.domElement);

    let gridHelper = new THREE.GridHelper(10 * 10, 10);
    // gridHelper.rotateX(Math.PI / 2);
    this.scene.add(gridHelper);
    this.defaultElements.push(gridHelper);

    let mesh	= this.createEarth();
    this.scene.add(mesh);

    this.lastTimeMsec = null;
    requestAnimationFrame(this.animate);
  }

  animate = (nowMsec) => {
    // keep looping
    requestAnimationFrame(this.animate);

    // measure time
    this.lastTimeMsec = this.lastTimeMsec || nowMsec - 1000 / 60;
    let deltaMsec = Math.min(200, nowMsec - this.lastTimeMsec);
    this.lastTimeMsec = nowMsec;

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

    let material = new THREE.MeshPhongMaterial({map: texture, color: 0x4444FF});
    let mesh = new THREE.Mesh(geometry, material);
    // let mesh	= new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({wireframe: true, color: 0x4444FF}));

    return mesh;
  }
}
