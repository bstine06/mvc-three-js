export default class AABB {
  constructor(xMin, xMax, yMin, yMax, zMin, zMax) {
    this.xMin = xMin;
    this.xMax = xMax;
    this.yMin = yMin;
    this.yMax = yMax;
    this.zMin = zMin;
    this.zMax = zMax;
}

// Check if this AABB intersects with another AABB
intersects(other) {
    return this.xMin <= other.xMax && this.xMax >= other.xMin &&
           this.yMin <= other.yMax && this.yMax >= other.yMin &&
           this.zMin <= other.zMax && this.zMax >= other.zMin;
}
}