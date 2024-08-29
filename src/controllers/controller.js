import Model from "../models/model.js";
import View from "../views/view.js";
import InputHandler from "../utils/inputHandler.js";

export default class Controller {
    constructor() {
        this.model = new Model();
        this.view = new View();
        this.inputHandler = new InputHandler(this);

        this.deltaTime = 0;
        this.animate = this.animate.bind(this);
        this.animate();
    }

    animate() {
        requestAnimationFrame(this.animate);

        
        this.deltaTime = performance.now() / 1000; // Convert to seconds

        // Update the model
        this.model.update(this.deltaTime);

        // Update the view (e.g., update rotations, positions)
        this.view.update(this.model);

        // Render the view
        this.view.render();

        this.updateDebugPane();
    }

    handleInput(keys) {
        this.model.onKeyPressed(keys);
    }

    updateDebugPane() {
      const state = this.model.getState();
      const cubePositionX = state.cube.positionX.toFixed(3);
      const cubePositionZ = state.cube.positionZ.toFixed(3);

      if (state.cube.alive) {
        document.getElementById('position-info').innerText = 
        `cube position: x: ${cubePositionX}, z: ${cubePositionZ}
         enemies alive: ${state.enemies.length}
         total seconds: ${this.deltaTime.toFixed(3)}`;
      }
      

    }
}

// Initialize the Controller, which in turn initializes the Model and View
const controller = new Controller();
