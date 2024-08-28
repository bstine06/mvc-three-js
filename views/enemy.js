import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js';

export default class Enemy {
    constructor() {
        const enemyGeometry = new THREE.BoxGeometry(10, 5, 10);
        const enemyMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
        this.enemy = new THREE.Mesh(enemyGeometry, enemyMaterial);
        this.enemy.castShadow = true;
        this.enemy.position.set(0, 20, 0);
    }

    getEnemy() {
        return this.enemy;
    }
}