import Cube from './cube.js';

export default class Model {
    constructor() {
        this.cube = new Cube();
    }

    // Methods to apply forces to the cube
    applyForce(direction) {
        this.cube.applyForce(direction);
    }

    update() {
        this.cube.update();
    }

    getState() {
        return this.cube.getState();
    }
}

