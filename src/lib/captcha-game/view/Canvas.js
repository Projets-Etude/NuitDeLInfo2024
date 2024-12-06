export default class Canvas {
  context;
  width;
  height;
  isRunning;

  constructor(canvasElement, scene) {
    this.context = canvasElement.getContext("2d");
    this.isRunning = false;

    new ResizeObserver(() => {
      console.log(
        `h: ${canvasElement.height}; cw: ${canvasElement.clientHeight}`
      );
      canvasElement.width = canvasElement.clientWidth;
      canvasElement.height = canvasElement.clientHeight;
      this.width = canvasElement.clientWidth;
      this.height = canvasElement.clientHeight;
      scene.width = this.width;
      scene.height = this.height;
    }).observe(canvasElement);
  }

  start() {
    if (this.isRunning) return;

    this.isRunning = true;
    this.handleRender();
  }

  stop() {
    this.isRunning = false;
    this.clearScreen();
  }

  clearScreen() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  render() {}

  handleRender() {
    if (!this.isRunning) return;

    this.clearScreen();
    this.render();
    window.requestAnimationFrame(this.handleRender.bind(this));
  }
}
