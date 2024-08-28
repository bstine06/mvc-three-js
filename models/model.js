import Cube from './cube.js';
import Enemy from './enemy.js';

export default class Model {
    constructor() {
        this.cube = new Cube(0.4, 0.96);
        this.enemies = [];
        this.enemyWaitTimer = 0;
    }

    // Methods to apply forces to the cube
    applyForce(direction) {
        this.cube.applyForce(direction);
    }

    update(deltaTime) {
        this.cube.update();

        // Iterate over the enemies and update their position
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            const enemy = this.enemies[i];
            enemy.update();
            
            // Check if enemy is out of bounds and remove it if so
            if (Math.abs(enemy.positionX) > 300 || Math.abs(enemy.positionZ) > 300) {
                this.enemies.splice(i, 1); // Remove enemy from array
            }
        }

        // Spawn new enemies
        if (this.enemyWaitTimer === 0) {
            const newEnemy = new Enemy(0.2, 1);
            this.addEnemy(newEnemy);
            this.enemyWaitTimer = 10;
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

