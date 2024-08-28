export default class Enemy {
  constructor() {
    this.positionX = 5000;
    this.positionZ = 0;
    this.velocityX = 0;
    this.velocityZ = 0;
    this.generateRandomCoordinate();
  }

  generateRandomCoordinate() {
    const randomStartingSide = Math.floor(Math.random() * 4);
    const randomSecondaryCoord = (Math.random() * 600) - 300
    const randomPrimaryVelocity = Math.random() * 2 + 1;
    // Left-to-right
    if (randomStartingSide === 0) { 
      this.positionX = -300;
      this.positionZ = randomSecondaryCoord;
      this.velocityX = randomPrimaryVelocity;
      this.velocityZ = 0;
    }
    // Right-to-Left
    if (randomStartingSide === 1) {
      this.positionX = 300;
      this.positionZ = randomSecondaryCoord;
      this.velocityX = -1 * randomPrimaryVelocity;
      this.velocityZ = 0;
    }
    // Top-to-Bottom
    if (randomStartingSide === 2) {
      this.positionX = randomSecondaryCoord;
      this.positionZ = -300;
      this.velocityX = 0;
      this.velocityZ = randomPrimaryVelocity;
    }
    // Bottom-to-Top
    if (randomStartingSide === 3) {
      this.positionX = randomSecondaryCoord;
      this.positionZ = 300;
      this.velocityX = 0;
      this.velocityZ = -1 * randomPrimaryVelocity;
    }
  }

  update() {
    // Update position
    this.positionX += this.velocityX;
    this.positionZ += this.velocityZ;
  }

  getState() {
    return {
      positionX: this.positionX,
      positionZ: this.positionZ,
    };
  }
}