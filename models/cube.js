export default class Cube {
    constructor() {
        this.positionX = -140;
        this.positionZ = 140;
        this.velocityX = 0;
        this.velocityZ = 0;
        this.acceleration = 0.5; // Acceleration for the cube
        this.friction = 0.93; // Friction to gradually slow down the cube
    }
  
    // Method to apply forces based on key inputs
    applyForce(direction) {
        if (direction === 'up') {
            this.velocityZ -= this.acceleration;
        } else if (direction === 'down') {
            this.velocityZ += this.acceleration;
        } else if (direction === 'left') {
            this.velocityX -= this.acceleration;
        } else if (direction === 'right') {
            this.velocityX += this.acceleration;
        }
    }
  
    // Method to update position based on velocity
    update() {
        this.positionX += this.velocityX;
        this.positionZ += this.velocityZ;
  
        // Apply friction
        this.velocityX *= this.friction;
        this.velocityZ *= this.friction;
    }
  
    getState() {
        return {
            positionX: this.positionX,
            positionZ: this.positionZ
        };
    }
  }
  