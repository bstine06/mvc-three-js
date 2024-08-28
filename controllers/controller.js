import Model from "../models/model.js";
import View from "../views/view.js";
import InputHandler from "../utils/inputHandler.js";

export default class Controller {
    constructor() {
        this.model = new Model();
        this.view = new View();
        this.inputHandler = new InputHandler(this);

        this.animate = this.animate.bind(this);
        this.animate();
    }

    animate() {
        requestAnimationFrame(this.animate);

        // Update the model with the current velocity
        this.model.update();

        // Update the view (e.g., update rotations, positions)
        this.view.update(this.model);

        // Render the view
        this.view.render();

        this.updateDebugPane();
    }

    handleInput(keys) {
        if (keys["ArrowUp"]) {
            this.model.applyForce('up');
        }
        if (keys["ArrowDown"]) {
            this.model.applyForce('down');
        }
        if (keys["ArrowLeft"]) {
            this.model.applyForce('left');
        }
        if (keys["ArrowRight"]) {
            this.model.applyForce('right');
        }
    }

    updateDebugPane() {
      const state = this.model.getState();
      document.getElementById('position-info').innerText = `Position: X: ${state.positionX.toFixed(3)}, Z: ${state.positionZ.toFixed(3)}`;

    }
}

// Initialize the Controller, which in turn initializes the Model and View
const controller = new Controller();
