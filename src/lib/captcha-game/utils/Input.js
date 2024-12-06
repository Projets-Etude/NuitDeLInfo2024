export default class Input {
    static #mouseLocation;

    static get mouseLocation () {
        return this.#mouseLocation;
    }

    static set mouseLocation(mouseLocation) {
        this.#mouseLocation = mouseLocation;
    }
}