import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js';

export default class View {
  constructor(controller) {
    this.controller = controller;
    this.canvas = document.getElementById("c");
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: this.canvas,
    });
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Optional: Use a softer shadow


    // Initialize camera
    this.camera = this.createCamera();

    // Initial size update
    this.updateSize();

    this.scene = new THREE.Scene();

    // Create the parent mesh (container)
    const parentMesh = new THREE.Object3D();
    parentMesh.rotation.y = this.toRadians(-8);

    // Create the stage (a nearly flat rectangle)
    const stageGeometry = new THREE.BoxGeometry(300, 10, 300);
    const stageMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
    const stage = new THREE.Mesh(stageGeometry, stageMaterial);

    // Add the stage to the parent mesh
    parentMesh.add(stage);

    // Create a small cube to sit on top of the stage
    const cubeGeometry = new THREE.BoxGeometry(20, 20, 20);
    const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    this.cubeTargetPosition = { x: this.cube.position.x, z: this.cube.position.z };

    // Enable shadow casting for the cube
    this.cube.castShadow = true;

    // Enable shadow receiving for the stage
    stage.receiveShadow = true;

    // Position the cube on top of the stage
    this.cube.position.set(140, 15, 140); // Adjust the Y position to sit on top of the stage

    // Add the cube to the parent mesh
    parentMesh.add(this.cube);

    // Add the parent mesh to the scene
    this.scene.add(parentMesh);

    // Add a DirectionalLight
    const light = new THREE.DirectionalLight(0xFFFFFF, 1);
    light.position.set(100, 100, 100);
    light.castShadow = true;

    const ambientLight = new THREE.AmbientLight(0x404040, 0.9); // soft light
    this.scene.add(ambientLight);


    // Configure shadow properties for the light
    light.shadow.mapSize.width = 2048; // Default is 512
    light.shadow.mapSize.height = 2048; // Default is 512
    light.shadow.camera.left = -250;
    light.shadow.camera.right = 250;
    light.shadow.camera.top = 250;
    light.shadow.camera.bottom = -250;
    light.shadow.camera.near = 1;
    light.shadow.camera.far = 500;


    this.scene.add(light);

    // Handle window resize
    window.addEventListener("resize", () => this.updateSize());
  }

  toRadians(degrees) {
    return degrees * (Math.PI/180);
  }

  createCamera() {
      // Large camera frustum to ensure the object fits well
      const left = -100;
      const right = 100;
      const top = 100;
      const bottom = -100;
      const near = -100;
      const far = 500;

      const camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
      camera.position.z = 100; // Position the camera further back
      camera.position.y = 100;
      camera.lookAt(0, 0, 0);

      return camera;
  }

  updateSize() {
      const size = Math.min(window.innerWidth, window.innerHeight);

      this.canvas.width = size;
      this.canvas.height = size;
      this.renderer.setSize(size, size);

      // Update camera with new dimensions
      const halfSize = size / 2;
      this.camera.left = -halfSize;
      this.camera.right = halfSize;
      this.camera.top = halfSize;
      this.camera.bottom = -halfSize;

      this.camera.updateProjectionMatrix();
  }

  render() {
      this.renderer.render(this.scene, this.camera);
  }

  update(model) {
      // Retrieve the current state from the model
    const state = model.getState();

    // Assuming the state includes x and z coordinates for the cube
    const { positionX, positionZ } = state;

    // Update the cube's position in the view
    this.cube.position.set(positionX, 15, positionZ);  // Adjust y-coordinate if needed
  
  }
}

