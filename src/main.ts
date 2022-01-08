// class App {
//   canvas: any;
//   ctx: any;
//   pixelRatio: number;
//   stageWidth: number;
//   stageHeight: number;

//   resize() {
//     this.stageWidth = document.body.clientWidth;
//     this.stageHeight = document.body.clientWidth;

//     this.canvas.width = this.stageWidth * this.pixelRatio;
//     this.canvas.height = this.stageHeight * this.pixelRatio;
//   };

//   animate() {

//   };

//   constructor() {
//     this.canvas = document.createElement('canvas');
//     document.body.appendChild(this.canvas);
//     this.ctx = this.canvas.getContext('2d');

//     this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

//     window.addEventListener('resize', this.resize.bind(this), false);

//     this.resize();

//     window.requestAnimationFrame(this.animate.bind(this));
//   }
// }

// window.onload = () => {
//   new App();
//   // console.log(devicePixelRatio)
// }


