import Sprite from "../utils/Sprite";
import ImageManager from "../utils/ImageManager";
import Input from "../utils/Input";
import Canvas from "./Canvas";

const SEA_COLOR = "#86BBD8";

export default class CanvasManager extends Canvas {
  #scoreElement;
  #imageManager;
  #scene;
  #gameObjects;

  constructor(canvasElement, scoreElement, scene) {
    super(canvasElement, scene);
    this.#scoreElement = scoreElement;
    this.#scene = scene;
    this.#gameObjects = scene.gameObjects;
    this.#imageManager = new ImageManager();

    canvasElement.addEventListener("mousemove", (event) => {
      const rect = canvasElement.getBoundingClientRect();
      Input.mouseLocation = {
        x: event.clientX - rect.left,
        y: this.height - event.clientY + rect.top,
      };
    });
  }

  render() {
    this.drawSea();
    this.drawGameObjects();

    this.#scoreElement.innerHTML = `Score: ${this.#scene.playerScore()} / ${this.#scene.maxPlayerScore()}`;
  }

  drawSea() {
    this.context.fillStyle = SEA_COLOR;
    this.context.fillRect(0, 0, this.width, this.height);
  }

  drawGameObjects() {
    this.#gameObjects.forEach(({ position, rotation, sprite }) =>
      this.drawSprite(position, rotation, sprite)
    );
  }

  drawSprite(position, rotation, { name, source, width, height }) {
    const img = this.#imageManager.getImage(name, source);
    const px = position.x;
    const py = this.height - position.y;

    this.context.save();
    this.context.translate(px, py);
    this.context.rotate(rotation);
    this.context.drawImage(img, -width / 2, -height / 2, width, height);
    this.context.restore();
  }
}
