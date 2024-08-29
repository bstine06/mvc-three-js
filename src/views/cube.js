import * as THREE from 'three';

export default class Cube {
    constructor() {
        const cubeGeometry = new THREE.BoxGeometry(20, 20, 20);
        const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
        this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        this.cube.castShadow = true;
        this.cube.position.set(140, 16, 140);
    }

    getCube() {
        return this.cube;
    }
}
