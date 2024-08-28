import Cube from "./cube.js";
import Enemy from "./enemy.js";

export default class Model {
  constructor() {
    this.cube = new Cube(0.6, 0.92, 0.7);
    this.enemies = [];
    this.enemyWaitTimer = 0;
    this.activeGame = true;

    this.enemyTimerInterval = 6;
  }

  applyForce(direction) {
    this.cube.applyForce(direction);
  }

  update(deltaTime) {
    this.cube.update();

    if (this.activeGame) {
      // Update each enemy and check for collisions
      for (let i = this.enemies.length - 1; i >= 0; i--) {
        const enemy = this.enemies[i];
        enemy.update();

        // Check if the enemy is out of bounds and remove it if so
        if (
          Math.abs(enemy.positionX) > 300 ||
          Math.abs(enemy.positionZ) > 300
        ) {
          this.enemies.splice(i, 1); // Remove enemy from array
          continue; // Skip collision detection for removed enemy
        }

        // Check collision with the cube
        if (this.cube.getAABB().intersects(enemy.getAABB())) {
          console.log("Collision detected!");
          // Handle collision (e.g., remove the enemy, update score, etc.)
          this.endRound();
        }
      }

      // Spawn new enemies
      if (this.enemyWaitTimer === 0) {
        const newEnemy = new Enemy(0.1, 2);
        this.addEnemy(newEnemy);
        this.enemyWaitTimer = this.enemyTimerInterval;
      }
      this.enemyWaitTimer--;
    }
  }

  endRound() {
    this.cube.fail();
    this.activeGame = false;
    this.enemies.forEach((enemy) => {
      enemy.velocityX = 0;
      enemy.velocityZ = 0;
    });
  }

  getState() {
    return {
      cube: this.cube.getState(),
      enemies: this.enemies.map((enemy) => enemy.getState()), // Array of enemy states
    };
  }

  addEnemy(enemy) {
    this.enemies.push(enemy);
  }
}
