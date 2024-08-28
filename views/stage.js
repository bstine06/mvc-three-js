import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js';

export default class Stage {
    constructor() {
        const stageGeometry = new THREE.BoxGeometry(300, 10, 300);
        const stageMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
        this.stage = new THREE.Mesh(stageGeometry, stageMaterial);
        this.stage.receiveShadow = true;
    }

    getStage() {
        return this.stage;
    }
}
