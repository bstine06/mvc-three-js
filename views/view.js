import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js';
import Camera from './Camera.js';
import Lighting from './Lighting.js';
import Stage from './Stage.js';
import Cube from './Cube.js';

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
        const { positionX, positionZ } = state;
        this.cube.getCube().position.set(positionX, this.cube.getCube().position.y, positionZ);
    }
}
