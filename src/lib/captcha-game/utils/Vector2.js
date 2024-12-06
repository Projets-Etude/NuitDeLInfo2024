export default class Vector2 {
  #x;
  #y;
  #magnitude;

  constructor(x = 0, y = 0) {
    this.#x = x;
    this.#y = y;
    this.#magnitude = this.magnitude();
  }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  set x(x) {
    this.#x = x;
    this.#magnitude = this.magnitude();
  }

  set y(y) {
    this.#y = y;
    this.#magnitude = this.magnitude();
  }

  clone() {
    return new Vector2(this.#x, this.#y);
  }

  plus({ x, y }) {
    return new Vector2(this.x + x, this.y + y);
  }

  minus({ x, y }) {
    return new Vector2(this.x - x, this.y - y);
  }

  multiply(multiplier) {
    return new Vector2(this.x * multiplier, this.y * multiplier);
  }

  magnitude() {
    return (this.#x ** 2 + this.#y ** 2) ** 0.5;
  }

  normalize() {
    if (this.#magnitude == 0) {
      return new Vector2(0, 0);
    }
    return new Vector2(this.#x / this.#magnitude, this.#y / this.#magnitude);
  }

  toString() {
    return `[x:${this.#x}, y:${this.#y}]`;
  }
}
