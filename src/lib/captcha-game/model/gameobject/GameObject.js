import Vector2 from "$lib/captcha-game/utils/Vector2";

export default class GameObject {
  static scene;
  static boat;
  #position;
  #rotation;
  #sprite;

  constructor(position, sprite) {
    this.#position = position;
    this.#rotation = 0;
    this.#sprite = sprite;
  }

  get position() {
    return this.#position;
  }

  set position(position) {
    this.#position = position;
  }

  get rotation() {
    return this.#rotation;
  }

  set rotation(rotation) {
    this.#rotation = rotation;
  }

  get sprite() {
    return this.#sprite;
  }

  update() {}
}
