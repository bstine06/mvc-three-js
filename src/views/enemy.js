import * as THREE from 'three';

export default class Enemy {
    constructor() {
        const enemyGeometry = new THREE.BoxGeometry(13, 5, 13);
        const enemyMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
        this.enemy = new THREE.Mesh(enemyGeometry, enemyMaterial);
        this.enemy.castShadow = true;
        this.enemy.position.set(0, 20, 0);
    }

    getEnemy() {
        return this.enemy;
    }
}