export default class Enemy {
  constructor(minVelocity, maxVelocity) {
    this.minVelocity = minVelocity;
    this.maxVelocity = maxVelocity;
    this.positionX = 5000;
    this.positionZ = 0;
    this.velocityX = 0;
    this.velocityZ = 0;
    this.generateRandomCoordinateAndVector();
  }

generateRandomCoordinateAndVector() {
    const randomStartingSide = Math.floor(Math.random() * 4);
    const randomFactor = Math.random();
    const randomSecondaryCoord = (randomFactor * 600) - 300;
    const randomPrimaryVelocity = Math.random() * (this.maxVelocity - this.minVelocity) + this.minVelocity;

    // Variables to hold position and velocity values
    let positionPrimary, positionSecondary, velocityPrimary, velocitySecondary;

    // Determine primary and secondary axes based on the spawn side
    if (randomStartingSide === 0 || randomStartingSide === 1) { // Left-to-right or Right-to-left
        positionPrimary = 'X';
        positionSecondary = 'Z';
    } else { // Top-to-Bottom or Bottom-to-Top
        positionPrimary = 'Z';
        positionSecondary = 'X';
    }

    // Set initial positions and primary velocity based on the starting side
    if (randomStartingSide === 0) { // Left-to-right
        this[`position${positionPrimary}`] = -300;
        this[`velocity${positionPrimary}`] = randomPrimaryVelocity;
    } else if (randomStartingSide === 1) { // Right-to-left
        this[`position${positionPrimary}`] = 300;
        this[`velocity${positionPrimary}`] = -randomPrimaryVelocity;
    } else if (randomStartingSide === 2) { // Top-to-Bottom
        this[`position${positionPrimary}`] = -300;
        this[`velocity${positionPrimary}`] = randomPrimaryVelocity;
    } else { // Bottom-to-Top
        this[`position${positionPrimary}`] = 300;
        this[`velocity${positionPrimary}`] = -randomPrimaryVelocity;
    }

    // Set the secondary position
    this[`position${positionSecondary}`] = randomSecondaryCoord;

    // Calculate time to cross the inner square boundary
    const timeToCrossBoundary = (150 + 300) / randomPrimaryVelocity;

    // Calculate the secondary velocity to intersect the inner square
    const targetSecondary = Math.max(-150, Math.min(150, randomSecondaryCoord));
    const secondaryVelocity = (targetSecondary - randomSecondaryCoord) / timeToCrossBoundary;

    // Ensure the secondary velocity is within the defined range
    this[`velocity${positionSecondary}`] = Math.sign(secondaryVelocity) * Math.max(this.minVelocity, Math.min(this.maxVelocity, Math.abs(secondaryVelocity)));
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
