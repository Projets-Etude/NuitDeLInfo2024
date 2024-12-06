export default class Scene {
  #gameObjects;
  #width;
  #height;

  constructor() {
    this.#gameObjects = [];
    this.#width = 0;
    this.#height = 0;
  }

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }

  get gameObjects() {
    return this.#gameObjects;
  }

  set width(width) {
    this.#width = width;
  }

  set height(height) {
    this.#height = height;
  }

  stop() {
    this.#gameObjects = [];
  }

  destroy(go) {
    const i = this.#gameObjects.indexOf(go);
    if (i > -1) {
      this.#gameObjects.splice(i, 1);
    }
  }
}
