import Cube from './cube.js';
import Enemy from './enemy.js';

export default class Model {
    constructor() {
        this.cube = new Cube();
        this.enemies = [];
        this.enemyWaitTimer = 0;
    }

    // Methods to apply forces to the cube
    applyForce(direction) {
        this.cube.applyForce(direction);
    }

    update(deltaTime) {
        this.cube.update();
        this.enemies.forEach(enemy => {
            enemy.update();
        });
        const newEnemy = new Enemy();
        if (this.enemyWaitTimer === 0) {
            this.addEnemy(newEnemy);
            this.enemyWaitTimer = 50;
        }
        this.enemyWaitTimer--;
    }

    getState() {
        return { cube  : this.cube.getState(),
                 enemies: this.enemies.map(enemy => enemy.getState()) // Array of enemy states
                };
    }

    addEnemy(enemy) {
        this.enemies.push(enemy);
    }
}

