import GameplayModel from "./gameplayModel.js";

export default class Model {
  constructor() {
    this.gameplayModel = new GameplayModel();
    this.state = {
      mode: "gameplay",
    };
  }

  update() {
    if (this.state.mode === "gameplay") {
      this.gameplayModel.update();
    }
  }

  getState() {
    if (this.state.mode === "gameplay") {
      return this.gameplayModel.getState();
    }
  }

  onKeyPressed(keys) {
    if (keys["ArrowUp"]) {
      this.gameplayModel.applyForce("up");
    }
    if (keys["ArrowDown"]) {
      this.gameplayModel.applyForce("down");
    }
    if (keys["ArrowLeft"]) {
      this.gameplayModel.applyForce("left");
    }
    if (keys["ArrowRight"]) {
      this.gameplayModel.applyForce("right");
    }
  }
}
