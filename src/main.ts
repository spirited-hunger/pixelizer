class App {
  canvas: any;
  ctx: any;
  pixelRatio: any;
  resize: any;
  constructor() {
    this.canvas = document.createElement('canvas');
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    window.addEventListener('resize', this.resize.bind(this), false);

    console.log(this)
  }
}

window.onload = () => {
  new App();
  console.log(devicePixelRatio)
}
