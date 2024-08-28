import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js';
import Camera from './camera.js';
import Lighting from './lighting.js';
import Stage from './stage.js';
import Cube from './cube.js';
import Enemy from './enemy.js';

export default class View {
    constructor(controller) {
        this.controller = controller;
        this.canvas = document.getElementById("c");
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            canvas: this.canvas,
        });
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        this.camera = new Camera();
        this.scene = new THREE.Scene();

        this.stage = new Stage();
        this.cube = new Cube();

        this.enemies = [];

        this.parentMesh = new THREE.Object3D();
        // this.parentMesh.rotation.y = this.toRadians(-8);

        this.parentMesh.add(this.stage.getStage());
        this.parentMesh.add(this.cube.getCube());

        this.scene.add(this.parentMesh);

        new Lighting(this.scene);

        this.updateSize();

        window.addEventListener("resize", () => this.updateSize());
    }

    toRadians(degrees) {
      return degrees * (Math.PI/180);
    }

    updateSize() {
        const size = Math.min(window.innerWidth, window.innerHeight);

        this.canvas.width = size;
        this.canvas.height = size;
        this.renderer.setSize(size, size);

        this.camera.updateSize(size);
    }

    render() {
        this.renderer.render(this.scene, this.camera.getCamera());
    }

    update(model) {
        const state = model.getState();

        // Update cube position
        const { positionX: cubePositionX, positionZ: cubePositionZ } = state.cube;
        this.cube.getCube().position.set(cubePositionX, this.cube.getCube().position.y, cubePositionZ);

        // Update enemies
        state.enemies.forEach((enemyState, index) => {
            if (this.enemies[index]) {
                // Update existing enemy
                const enemyMesh = this.enemies[index];
                enemyMesh.position.set(enemyState.positionX, enemyMesh.position.y, enemyState.positionZ);
            } else {
                // Create new enemy if needed
                const enemy = new Enemy();
                const enemyMesh = enemy.getEnemy();
                enemyMesh.position.set(enemyState.positionX, enemyMesh.position.y, enemyState.positionZ);
                this.enemies.push(enemyMesh);
                this.scene.add(enemyMesh);
            }
        });
        // Remove excess enemies
        if (this.enemies.length > state.enemies.length) {
          for (let i = state.enemies.length; i < this.enemies.length; i++) {
              this.scene.remove(this.enemies[i]);
          }
          this.enemies = this.enemies.slice(0, state.enemies.length);
      }
    }
}
