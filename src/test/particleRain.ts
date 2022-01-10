import { isFunctionExpression } from "../../node_modules/typescript/lib/typescript.js";
import {astronautImage} from "./images.js";

const myImage = new Image();
myImage.src = astronautImage.base64;

myImage.addEventListener('load', () => { // after all, base64 is a url request. sometimes it responds slower than js file. so it fails to upload the image all the time. this is why we add eventlistener
  const canvas: any = document.getElementById("myCanvas");

  const ctx = canvas.getContext("2d");
  
  canvas.width = 500;
  canvas.height = 500;
  
  ctx.drawImage(myImage, 0, 0, canvas.width, canvas.height);

  // ! IMPORTANT
  // getting pixel data from selected area (in this case whole image)
  const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);

  let particlesArray = [];
  const numberOfParticles = 5000;

  let mappedImage = [];
  for (let y = 0; y < canvas.height; y++) {
    let row = [];
    for (let x = 0; x < canvas.width; x++) {
      const red = pixels.data[(y * 4 * pixels.width) + (x * 4)];
      const green = pixels.data[(y * 4 * pixels.width) + (x * 4) + 1];
      const blue = pixels.data[(y * 4 * pixels.width) + (x * 4) + 2];
      const alpha = pixels.data[(y * 4 * pixels.width) + (x * 4) + 3];
    }
  }

  class Particle {
      x: number;
      y: number;
      speed: number;
      velocity: number;
      size: number;

      constructor() {
          this.x = Math.random() * canvas.width;
          this.y = 0;
          this.speed = 0;
          this.velocity = Math.random() * 3.5;
          this.size = Math.random() * 1.5 + 1;
      }

      update() {
        this.y += this.velocity;
        if (this.y >= canvas.height) {
          this.y = 0;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
  }
  function init() {
    for (let i = 0; i < numberOfParticles; i ++) {
      particlesArray.push(new Particle);
    }
  }
  init();

  function animate () {
    ctx.drawImage(myImage, 0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 0.05;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();
    }
    requestAnimationFrame(animate);
  }
  animate();
})
