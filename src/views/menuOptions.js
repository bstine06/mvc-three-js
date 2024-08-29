import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js';

export class StartGamePad {
    constructor() {
        const padGeometry = new THREE.CylinderGeometry(40, 20, 1, 100);
        const padMaterial = new THREE.MeshPhongMaterial({ color: 0x00cc00 });
        this.pad = new THREE.Mesh(padGeometry, padMaterial);
        this.pad.receiveShadow = true;
        this.pad.position.set(0,5.7,0);

        this.startGamePad = new THREE.Object3D();
        this.startGamePad.add(this.pad);
    }

    getStartGamePad() {
        return this.startGamePad;
    }
}