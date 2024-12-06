import Vector2 from "../utils/Vector2";
import CanvasManager from "../view/CanvasManager";
import GameObject from "./gameobject/GameObject";
import Player from "./gameobject/Player";
import Waste from "./gameobject/Waste";
import WasteShadow from "./gameobject/WasteShadow";
import Scene from "./Scene";

const UPDATES_PER_SECOND = 100;
const WASTE_SPAWNER_TIME = 2000;
const MAX_PLAYER_SCORE = 5;

export default class GameScene extends Scene {
  #canvas;
  #context;
  #mainInterval;
  #spawnInterval;
  #player;
  #playerScore;

  constructor(canvasElement, scoreElement) {
    super();
    GameObject.scene = this;
    this.#canvas = canvasElement;
    this.#context = new CanvasManager(canvasElement, scoreElement, this);
    this.#playerScore = 0;
  }

  playerScore() {
    return this.#playerScore;
  }

  maxPlayerScore() {
    return MAX_PLAYER_SCORE;
  }

  initialize() {
    console.log("initialize");
    this.#context.start();
    this.#mainInterval = setInterval(
      this.update.bind(this),
      1000 / UPDATES_PER_SECOND
    );
    this.#spawnInterval = setInterval(
      this.spawnWaste.bind(this),
      WASTE_SPAWNER_TIME
    );
    this.#player = new Player();
    GameObject.boat = this.#player;
    super.gameObjects.push(this.#player);
  }

  stop() {
    console.log("stop");
    this.#context.stop();
  }

  update() {
    super.gameObjects.forEach((gameObject) => gameObject.update());
  }

  destroyWaste(wasteGO, isGrab) {
    this.#playerScore += isGrab ? 1 : -1;

    if (this.#playerScore >= 5) {
      successCaptcha();
    } else if (this.#playerScore < 0) {
      failedCaptcha();
    }

    super.destroy(wasteGO);
    super.destroy(wasteGO.shadowGO);
  }

  spawnWaste() {
    const shadowPosition = this.randomShadowWastePosition();
    const wastePosition = shadowPosition.plus({
      x: Math.random() * (this.width / 4) - this.width / 8,
      y: this.height / 2,
    });

    const shadow = new WasteShadow(shadowPosition);
    const waste = new Waste(wastePosition, shadow);

    super.gameObjects.push(shadow);
    super.gameObjects.push(waste);
  }

  randomShadowWastePosition() {
    return new Vector2(Math.random() * this.width, Math.random() * this.height);
  }

  successCaptcha() {}

  failedCaptcha() {}
}
