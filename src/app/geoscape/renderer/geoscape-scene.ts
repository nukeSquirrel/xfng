import * as THREE from 'three';

export class GeoscapeScene {

  scene: THREE.Scene;
  private camera: THREE.Camera;
  private renderer: THREE.WebGLRenderer;
  private defaultElements = [];
  private lastTimeMsec;

  private rotate = true;
  private rotateHorizontal = true;

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

    this.renderer.setSize(screen.width, screen.height);
    container.appendChild(this.renderer.domElement);

    // let gridHelper = new THREE.GridHelper(10 * 10, 10);
    // // gridHelper.rotateX(Math.PI / 2);
    // this.scene.add(gridHelper);
    // this.defaultElements.push(gridHelper);

    let mesh	= this.createEarth();
    this.scene.add(mesh);

    this.scene.add(this.createPoint());

    document.addEventListener('mousedown', (ev: MouseEvent) => {

      if (ev.button === 2) {
        this.rotateHorizontal = ! this.rotateHorizontal;
      } else if (ev.button === 0) {
        this.rotate = false;
      }
    });
    document.addEventListener('mouseup', (ev: MouseEvent) => {
      if (ev.button === 0) {
        this.rotate = true;
      }
    });

    this.lastTimeMsec = null;
    setInterval(() => {
      this.render();
    }, 1000 / 25);
    // requestAnimationFrame(this.animate);
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
      if (this.rotate) {
        this.rotateCamera();
      }
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

  private rotateCamera() {
    let rotSpeed = 0.02;

    this.camera.position.applyQuaternion(
      new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, -1, 0), // y-axis
        12 / 1000 * 5 // 5/1000 per rendering.
      ))
    ;
    this.camera.lookAt(this.scene.position);
  }
}
