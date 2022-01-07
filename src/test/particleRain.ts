import {astronautImage} from "./images.js";

const myImage = new Image();
myImage.src = astronautImage.base64;

myImage.addEventListener('load', () => { // after all, base64 is a url request. sometimes it responds slower than js file. so it fails to upload the image all the time. this is why we add eventlistener
  const canvas: any = document.getElementById("myCanvas");

  const ctx = canvas.getContext("2d");
  
  canvas.width = 500;
  canvas.height = 500;
  
  ctx.drawImage(myImage, 0, 0, canvas.width, canvas.height);
  
})
