export default class Sprite {
  #name;
  #source;
  #width;
  #height;

  constructor({ name, source, width, height }) {
    this.#name = name;
    this.#source = source;
    this.#width = width;
    this.#height = height;
  }

  get name() {
    return this.#name;
  }

  get source() {
    return this.#source;
  }

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }
}
