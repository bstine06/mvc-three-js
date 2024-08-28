import AABB from '../utils/aabb.js';

export default class Cube {
  constructor(acceleration, friction) {
    this.positionX = -140;
    this.positionZ = 140;
    this.velocityX = 0;
    this.velocityZ = 0;
    this.acceleration = acceleration; // Acceleration for the cube
    this.friction = friction; // Friction to gradually slow down the cube
    this.size = 20;
    // Boundary limits
    this.minX = -140;
    this.maxX = 140;
    this.minZ = -140;
    this.maxZ = 140;

    this.alive = true;
  }

  // Method to apply forces based on key inputs
  applyForce(direction) {
    if (direction === "up") {
      this.velocityZ -= this.acceleration;
    } else if (direction === "down") {
      this.velocityZ += this.acceleration;
    } else if (direction === "left") {
      this.velocityX -= this.acceleration;
    } else if (direction === "right") {
      this.velocityX += this.acceleration;
    }
  }

  // Method to update position based on velocity
  update() {
    // Update position
    this.positionX += this.velocityX;
    this.positionZ += this.velocityZ;

    // Apply friction
    this.velocityX *= this.friction;
    this.velocityZ *= this.friction;

    // Enforce boundary limits for x position
    if (this.positionX < this.minX) {
      this.positionX = this.minX;
      this.velocityX = 0; // Stop movement when hitting the boundary
    } else if (this.positionX > this.maxX) {
      this.positionX = this.maxX;
      this.velocityX = 0; // Stop movement when hitting the boundary
    }

    // Enforce boundary limits for z position
    if (this.positionZ < this.minZ) {
      this.positionZ = this.minZ;
      this.velocityZ = 0; // Stop movement when hitting the boundary
    } else if (this.positionZ > this.maxZ) {
      this.positionZ = this.maxZ;
      this.velocityZ = 0; // Stop movement when hitting the boundary
    }
  }

  fail() {
    this.alive = false;
  }

  getState() {
    return {
      positionX: this.positionX,
      positionZ: this.positionZ,
      alive: this.alive
    };
  }
  
  // Get the AABB for this cube
  getAABB() {
    return new AABB(
        this.positionX - this.size / 2,
        this.positionX + this.size / 2,
        -this.size / 2, // Assuming cube is flat on the y-axis
        this.size / 2,
        this.positionZ - this.size / 2,
        this.positionZ + this.size / 2
    );
  }
}
