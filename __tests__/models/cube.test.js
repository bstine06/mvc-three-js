// __tests__/cube.test.js
import Cube from '../../src/models/cube'; // Adjust the path as needed
import AABB from '../../src/utils/aabb'; // Adjust the path as needed

describe('Cube', () => {
  let cube;

  beforeEach(() => {
    cube = new Cube(1, 0.9, 0.5); // Initialize with some values
  });

  test('should apply force correctly', () => {
    cube.applyForce('up');
    expect(cube.velocityZ).toBe(-1);

    cube.applyForce('down');
    expect(cube.velocityZ).toBe(0); // Should be reset by the previous 'up' force

    cube.applyForce('left');
    expect(cube.velocityX).toBe(-1);

    cube.applyForce('right');
    expect(cube.velocityX).toBe(0); // Should be reset by the previous 'left' force
  });

  test('should update position and handle boundaries', () => {
    cube.velocityX = 10;
    cube.velocityZ = 10;
    
    cube.update(); // Velocity should have friction applied. VelocityX = 9. VelocityZ = 9
    
    expect(cube.positionX).toBe(85); // Initial positionX (75) + velocityX (10)
    expect(cube.positionZ).toBe(85); // Initial positionZ (75) + velocityZ (10)

    cube.positionX = 150; // Beyond the max boundary
    cube.update(); // Velocity should have friction applied. VelocityX = 8.1. VelocityZ = 9
    expect(cube.positionX).toBe(140); // Should be clamped to maxX
    expect(cube.velocityX).toBe(-4.05); // Velocity should be bounced (8.1 * -bounciness)

    cube.positionZ = -150; // Beyond the min boundary
    cube.update();  // Velocity Z will have friction applied. VelocityZ = 7.29
    expect(cube.positionZ).toBe(-140); // Should be clamped to minZ
    expect(cube.velocityZ).toBe(-3.645); // Velocity should be bounced (7.29 * -bounciness)
  });

  test('should correctly change alive state', () => {
    cube.fail();
    expect(cube.alive).toBe(false);
  });

  test('should return the correct state', () => {
    const state = cube.getState();
    expect(state).toEqual({
      positionX: 75,
      positionZ: 75,
      alive: true
    });
  });

  test('should return the correct AABB', () => {
    const aabb = cube.getAABB();
    expect(aabb).toEqual(new AABB(
      65, 85, // xMin, xMax
      -10, 10, // yMin, yMax (assuming cube is flat on the y-axis)
      65, 85  // zMin, zMax
    ));
  });
});
