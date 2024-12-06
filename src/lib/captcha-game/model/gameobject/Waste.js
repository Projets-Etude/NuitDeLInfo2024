import { randomWasteSpriteData } from "$lib/captcha-game/data/imageDatas";
import Sprite from "../../utils/Sprite";
import GameObject from "./GameObject";

const THRESHOLD_COLLIDER = 110 / 8;

export default class Waste extends GameObject {
  #shadow;
  #turnDirection;

  constructor(position, shadow) {
    super(position, new Sprite(randomWasteSpriteData()));
    this.#shadow = shadow;
    this.#turnDirection = Math.random() < 0.5 ? 1 : -1;
  }

  update() {
    const delta = this.#shadow.position.minus(this.position);
    const distance = delta.magnitude();

    if (distance <= THRESHOLD_COLLIDER) {
      GameObject.scene.destroyWaste(this, this.#shadow, false);
      return;
    }

    const direction = delta.normalize().multiply(2);

    this.position.x += direction.x;
    this.position.y += direction.y;
    this.rotation += 0.04 * this.#turnDirection;
  }
}
