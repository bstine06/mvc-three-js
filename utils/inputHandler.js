export default class InputHandler {
    constructor(controller) {
        this.controller = controller;
        this.keys = {};

        window.addEventListener('keydown', (event) => {
            this.keys[event.key] = true;
        });

        window.addEventListener('keyup', (event) => {
            this.keys[event.key] = false;
        });

        // Start the continuous update loop
        this.startUpdateLoop();
    }

    startUpdateLoop() {
        const update = () => {
            this.controller.handleInput(this.keys);
            requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
    }
}

