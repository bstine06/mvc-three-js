import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js';

export default class Lighting {
    constructor(scene) {
        // Add a DirectionalLight
        this.light = new THREE.DirectionalLight(0xFFFFFF, 1);
        this.light.position.set(100, 100, 100);
        this.light.castShadow = true;

        // Configure shadow properties for the light
        this.light.shadow.mapSize.width = 2048; 
        this.light.shadow.mapSize.height = 2048; 
        this.light.shadow.camera.left = -250;
        this.light.shadow.camera.right = 250;
        this.light.shadow.camera.top = 250;
        this.light.shadow.camera.bottom = -250;
        this.light.shadow.camera.near = 1;
        this.light.shadow.camera.far = 500;

        const ambientLight = new THREE.AmbientLight(0x404040, 0.9); // soft light

        scene.add(this.light);
        scene.add(ambientLight);
    }
}
