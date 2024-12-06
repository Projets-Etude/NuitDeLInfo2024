import { randomWasteSpriteData } from "$lib/captcha-game/data/imageDatas";
import Sprite from "../../utils/Sprite";
import GameObject from "./GameObject";
import Player from "./Player";

const SHADOW_THRESHOLD_COLLIDER = 15;
const BOAT_THRESHOLD_COLLIDER = 15 * 6;
const DELTA_ROTATION = 0.04;

export default class Waste extends GameObject {
  #shadow;
  #turnDirection;

  constructor(position, shadow) {
    super(position, new Sprite(randomWasteSpriteData()));
    this.#shadow = shadow;
    this.#turnDirection = Math.random() < 0.5 ? 1 : -1;
  }

  get shadowGO() {
    return this.#shadow;
  }

  isCloseToTheGround() {
    return this.#shadow.position.minus(this.position).magnitude();
  }

  update() {
    const delta = this.#shadow.position.minus(this.position);
    const distance = delta.magnitude();

    if (distance <= SHADOW_THRESHOLD_COLLIDER) {
      GameObject.scene.destroyWaste(this, this.checkIfBoat());
      return;
    }

    const direction = delta.normalize().multiply(2);

    this.position.x += direction.x;
    this.position.y += direction.y;
    this.rotation += this.#turnDirection * DELTA_ROTATION;
  }

  checkIfBoat() {
    return this.distanceTo(GameObject.boat) <= BOAT_THRESHOLD_COLLIDER;
  }

  distanceTo(go) {
    return go.position.minus(this.position).magnitude();
  }
}
