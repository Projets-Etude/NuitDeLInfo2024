export default class ImageManager {
  #imageDatas;

  constructor() {
    this.#imageDatas = new Map();
  }

  getData(name, source) {
    if (!this.#imageDatas.has(name)) {
      const img = new Image();
      const data = { name: name, image: img };
      img.src = source;
      img.onload = () => console.log(`L'image '${name}' à été chargée`);

      this.#imageDatas.set(name, data);

      return data;
    }
    return this.#imageDatas.get(name);
  }

  getImage(name, source) {
    return this.getData(name, source).image;
  }
}
