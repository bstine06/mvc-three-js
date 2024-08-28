import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js';

export default class Camera {
    constructor() {
        const left = -100;
        const right = 100;
        const top = 100;
        const bottom = -100;
        const near = -100;
        const far = 500;

        this.camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
        this.camera.position.z = 100;
        this.camera.position.y = 100;
        this.camera.lookAt(0, 0, 0);
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
