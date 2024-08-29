import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js";

export default class Lighting {
  constructor(scene) {
    // Add a DirectionalLight
    this.light1 = new THREE.DirectionalLight(0x00FFFF, 0.5);
    this.light1.position.set(-140, 300, 140);
    this.light1.castShadow = true;

    // Configure shadow properties for the light
    // Increase shadow map size
    this.light1.shadow.mapSize.width = 4096;
    this.light1.shadow.mapSize.height = 4096;

    // Ensure the shadow camera covers the area
    this.light1.shadow.camera.left = -500;
    this.light1.shadow.camera.right = 500;
    this.light1.shadow.camera.top = 500;
    this.light1.shadow.camera.bottom = -500;
    this.light1.shadow.camera.near = 1;
    this.light1.shadow.camera.far = 1000;

    // Add a DirectionalLight
    this.light2 = new THREE.DirectionalLight(0xFF69B4, 0.6);
    this.light2.position.set(-140, 300, 140);
    this.light2.castShadow = true;

    // Configure shadow properties for the light
    // Increase shadow map size
    this.light2.shadow.mapSize.width = 4096;
    this.light2.shadow.mapSize.height = 4096;

    // Ensure the shadow camera covers the area
    this.light2.shadow.camera.left = -500;
    this.light2.shadow.camera.right = 500;
    this.light2.shadow.camera.top = 500;
    this.light2.shadow.camera.bottom = -500;
    this.light2.shadow.camera.near = 1;
    this.light2.shadow.camera.far = 1000;

    const ambientLight = new THREE.AmbientLight(0x404040, 0.9); // soft light

    scene.add(this.light1);
    scene.add(this.light2);
    scene.add(ambientLight);
  }
}
