import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js';

export default class Camera {
    constructor() {
        // Define camera parameters
        const fov = 20; // Field of view in degrees
        const aspect = window.innerWidth / window.innerHeight; // Aspect ratio
        const near = 0.1; // Near clipping plane
        const far = 1500; // Far clipping plane
    
        // Create perspective camera
        this.camera = new THREE.PerspectiveCamera(fov, 1, near, far);
    
        // Position the camera above the scene and look down
        this.camera.position.set(0, 1000, 400); // Positioned above the scene
        this.camera.lookAt(new THREE.Vector3(0, 0, 0)); // Look at the center of the scene
    
        // Ensure the camera's projection matrix is updated
        this.camera.updateProjectionMatrix();
    }
    

    getCamera() {
        return this.camera;
    }

    updateSize(size) {
        const halfSize = size / 2;
        this.camera.left = -halfSize;
        this.camera.right = halfSize;
        this.camera.top = halfSize;
        this.camera.bottom = -halfSize;
        this.camera.updateProjectionMatrix();
    }
}
